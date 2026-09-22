export default function AIAssistant({
  result,
  loading,
  error,
  onAnalyze,
  onApply,
}) {
  if (!result && !loading && !error) {
    return (
      <div className="ai-assistant">
        <button
          type="button"
          className="ai-analyze-btn"
          onClick={onAnalyze}
        >
          ✨ Analyser avec l'IA
        </button>
      </div>
    );
  }

  return (
    <div className="ai-assistant">

      <div className="ai-assistant-header">
        <h3>✨ Analyse IA</h3>
      </div>

      {loading && (
        <div className="ai-loading">
          🤖 Gemini analyse votre User Story...
        </div>
      )}

      {error && (
        <div className="ai-error">
          ❌ {error}
        </div>
      )}

      {result && !loading && (
        <div className="ai-result">

          {/* Clarté */}
          <div className="ai-section">
            <h4>
              {result.isClear
                ? "✅ User Story claire"
                : "⚠️ User Story à améliorer"}
            </h4>
          </div>

          {/* Informations manquantes */}
          {result.missingInformation?.length > 0 && (
            <div className="ai-section">
              <h4>⚠️ Informations manquantes</h4>

              <ul>
                {result.missingInformation.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Critères */}
          {result.criteriaImprovements?.length > 0 && (
            <div className="ai-section">
              <h4>Critères à améliorer</h4>

              <ul>
                {result.criteriaImprovements.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Suggestions */}
          {result.suggestions?.length > 0 && (
            <div className="ai-section">
              <h4>Suggestions</h4>

              <ul>
                {result.suggestions.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Proposition améliorée */}
          {result.improvedUserStory && (
            <div className="ai-improved-story">

              <h4>✨ Proposition améliorée</h4>

              <p>
                <strong>Titre :</strong>
                <br />
                {result.improvedUserStory.title}
              </p>

              <p>
                <strong>Description :</strong>
                <br />
                {result.improvedUserStory.description}
              </p>

              <p>
                <strong>Business Value :</strong>
                <br />
                {result.improvedUserStory.businessValue}
              </p>

              <div>
                <strong>
                  Critères d'acceptation :
                </strong>

                <ul>
                  {result.improvedUserStory.acceptanceCriteria?.map(
                    (criterion, index) => (
                      <li key={index}>
                        {criterion}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <button
                type="button"
                className="ai-apply-btn"
                onClick={onApply}
              >
                ✨ Utiliser cette proposition
              </button>

            </div>
          )}

        </div>
      )}

      {result && !loading && (
        <button
          type="button"
          className="ai-analyze-btn"
          onClick={onAnalyze}
        >
          🔄 Réanalyser
        </button>
      )}

    </div>
  );
}