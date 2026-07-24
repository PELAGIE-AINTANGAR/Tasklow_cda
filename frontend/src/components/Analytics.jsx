import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

import {
  getAnalytics
} from "../services/analyticsService";



export default function Analytics() {

  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);
    
  const [error, setError] = useState(null);

  useEffect(() => {

    loadAnalytics();

  }, []);

   const loadAnalytics = async () => {
    try {
      setLoading(true);

      setError(null);

      const data = await getAnalytics();

      console.log(
        "ANALYTICS DATA :",
        data
      );

      setAnalytics(data);

    } catch (error) {
      console.error(
        "Analytics error :",
        error
      );

      setError(
        "Unable to load analytics."
      );

    } finally {
      setLoading(false);
    }
  };


  if (loading) {

    return (

      <div className="analytics-loading">

        Loading analytics...

      </div>

    );

  }


  if (!analytics) {

    return (

      <div>

        Unable to load analytics.

      </div>

    );

  }


  const COLORS = [

    "#8B5CF6",

    "#3B82F6",

    "#F59E0B",

    "#22C55E"

  ];


  return (

    <div className="analytics-page">

      <div className="analytics-title">

        <h2>Analytics</h2>

        <p>

          Overview of your projects and tasks

        </p>

      </div>


      <div className="analytics-stats">


        <div className="analytics-stat-card">

          <span className="stat-icon">
            📋
          </span>

          <div>

            <h3>
              {analytics.totalTasks}
            </h3>

            <p>Total Tasks</p>

          </div>

        </div>


        <div className="analytics-stat-card">

          <span className="stat-icon">
            ✅
          </span>

          <div>

            <h3>
              {analytics.completedTasks}
            </h3>

            <p>Completed</p>

          </div>

        </div>


        <div className="analytics-stat-card">

          <span className="stat-icon">
            📈
          </span>

          <div>

            <h3>

              {analytics.completionRate}%

            </h3>

            <p>Completion Rate</p>

          </div>

        </div>


        <div className="analytics-stat-card">

          <span className="stat-icon">
            📁
          </span>

          <div>

            <h3>
              {analytics.totalProjects}
            </h3>

            <p>Total Projects</p>

          </div>

        </div>


      </div>


      <div className="analytics-charts">


        <div className="chart-card">

          <h3>Tasks by Status</h3>

          <ResponsiveContainer
            width="100%"
            height={280}
          >

            <PieChart>

              <Pie
                data={analytics.tasksByStatus}
                dataKey="value"
                nameKey="name"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={4}
              >

                {analytics.tasksByStatus.map(
                  (entry, index) => (

                    <Cell
                      key={entry.name}
                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>


        <div className="chart-card">

          <h3>Tasks by Project</h3>

          <ResponsiveContainer
            width="100%"
            height={280}
          >

            <BarChart
              data={
                analytics.tasksByProject
              }
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="tasks"
                fill="#8B5CF6"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>


      </div>


      <div className="progress-card">

        <h3>Project Progress</h3>


        {analytics.projectProgress.map(
          (project) => (

            <div
              className="project-progress"
              key={project.name}
            >

              <div className="progress-info">

                <span>
                  {project.name}
                </span>

                <span>

                  {project.progress}%

                </span>

              </div>


              <div className="progress-bar">

                <div
                  className="progress-value"
                  style={{
                    width:
                      `${project.progress}%`
                  }}
                />

              </div>

            </div>

          )
        )}

      </div>


    </div>

  );

}