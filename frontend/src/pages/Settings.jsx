import {
  useEffect,
  useState
} from "react";


import {

  getCurrentUser,

  updateEmail,

  updatePassword

} from "../services/userService";


export default function Settings() {


  const [username, setUsername] =
    useState("");


  const [email, setEmail] =
    useState("");


  const [
    currentPassword,
    setCurrentPassword
  ] = useState("");


  const [
    newPassword,
    setNewPassword
  ] = useState("");


  const [
    confirmPassword,
    setConfirmPassword
  ] = useState("");


  const [message, setMessage] =
    useState("");


  const [error, setError] =
    useState("");


  const [loading, setLoading] =
    useState(true);



  useEffect(() => {

    loadUser();

  }, []);



  const loadUser = async () => {

    try {

      const user =
        await getCurrentUser();


      setUsername(
        user.username
      );


      setEmail(
        user.email
      );


    } catch (error) {

      setError(
        error.message
      );


    } finally {

      setLoading(false);

    }

  };



  const handleEmailSave = async () => {

    try {

      setError("");

      setMessage("");


      const user =
        await updateEmail(
          email
        );


      setEmail(
        user.email
      );


      setMessage(
        "Email modifié avec succès"
      );


    } catch (error) {

      setError(
        error.message
      );

    }

  };



  const handlePasswordSave = async () => {

    try {

      setError("");

      setMessage("");


      if (
        newPassword !== confirmPassword
      ) {

        setError(
          "Les mots de passe ne correspondent pas"
        );

        return;

      }


      await updatePassword(

        currentPassword,

        newPassword

      );


      setCurrentPassword("");

      setNewPassword("");

      setConfirmPassword("");


      setMessage(
        "Mot de passe modifié avec succès"
      );


    } catch (error) {

      setError(
        error.message
      );

    }

  };



  if (loading) {

    return (

      <div>

        Loading settings...

      </div>

    );

  }
  const getPasswordStrength = () => {

    if (!newPassword) {

      return {
        label: "",
        level: 0
      };

    }


    let level = 0;


    if (newPassword.length >= 8) {

      level++;

    }


    if (/[A-Z]/.test(newPassword)) {

      level++;

    }


    if (/[0-9]/.test(newPassword)) {

      level++;

    }


    if (
      /[^A-Za-z0-9]/.test(newPassword)
    ) {

      level++;

    }


    const labels = [

      "",

      "Weak",

      "Medium",

      "Good",

      "Strong"

    ];


    return {

      label: labels[level],

      level

    };

  };


  const passwordStrength =
    getPasswordStrength();


  return (

    <div className="settings-page">


      <div className="settings-title">

        <h2>

          Settings

        </h2>


        <p>

          Manage your account and security

        </p>

      </div>
      <div className="settings-profile-banner">

        <div className="profile-avatar">

          {username
            ? username
                .substring(0, 2)
                .toUpperCase()
            : "TF"}

        </div>


        <div className="profile-banner-info">

          <h3>
            {username}
          </h3>

          <p>
            {email}
          </p>

          <span className="account-type">
            TaskFlow Account
          </span>

        </div>


        <div className="account-status">

          <span className="status-dot"></span>

          Active

        </div>

      </div>



      {message && (

        <div className="settings-success">

          {message}

        </div>

      )}



      {error && (

        <div className="settings-error">

          {error}

        </div>

      )}



      <div className="settings-grid">


        <div className="settings-card">


          <div className="settings-card-title">

            <span className="settings-icon">

              👤

            </span>


            <h3>

              Profile Information

            </h3>

          </div>



          <div className="settings-field">

            <label>

              Username

            </label>


            <input

              type="text"

              value={username}

              disabled

            />

          </div>



          <div className="settings-field">

            <label>

              Email

            </label>


            <input

              type="email"

              value={email}

              onChange={(e) =>

                setEmail(
                  e.target.value
                )

              }

            />

          </div>



          <button

            className="save-btn"

            onClick={
              handleEmailSave
            }

          >

            Update Email

          </button>


        </div>



        <div className="settings-card">


          <div className="settings-card-title">

            <span className="settings-icon">

              🔐

            </span>


            <h3>

              Security

            </h3>

          </div>



          <div className="settings-field">

            <label>

              Current Password

            </label>


            <input

              type="password"

              value={
                currentPassword
              }

              onChange={(e) =>

                setCurrentPassword(
                  e.target.value
                )

              }

              placeholder="Current password"

            />

          </div>



          <div className="settings-field">

            <label>

              New Password

            </label>


            <input

              type="password"

              value={
                newPassword
              }

              onChange={(e) =>

                setNewPassword(
                  e.target.value
                )

              }

              placeholder="New password"

            />

          </div>
          {newPassword && (

            <div className="password-strength">

              <div className="strength-header">

                <span>
                  Password strength
                </span>

                <span
                  className={
                    `strength-label strength-${passwordStrength.level}`
                  }
                >

                  {passwordStrength.label}

                </span>

              </div>


              <div className="strength-bars">

                {[1, 2, 3, 4].map(
                  (level) => (

                    <span

                      key={level}

                      className={

                        passwordStrength.level >= level

                          ? `active strength-${passwordStrength.level}`

                          : ""

                      }

                    />

                  )
                )}

              </div>

            </div>

          )}



          <div className="settings-field">

            <label>

              Confirm Password

            </label>


            <input

              type="password"

              value={
                confirmPassword
              }

              onChange={(e) =>

                setConfirmPassword(
                  e.target.value
                )

              }

              placeholder="Confirm password"

            />

          </div>



          <button

            className="save-btn"

            onClick={
              handlePasswordSave
            }

          >

            Update Password

          </button>


        </div>


      </div>
      <div className="settings-account-card">

        <div className="account-card-content">

          <div className="account-card-icon">

            🛡️

          </div>


          <div>

            <h3>
              Account Security
            </h3>

            <p>

              Your account is protected
              by password authentication.

            </p>

          </div>

        </div>


        <button
          className="logout-settings-btn"
          onClick={() => {

            localStorage.removeItem("token");

            window.location.href = "/login";

          }}
        >

          Log out

        </button>

      </div>


    </div>

  );

}