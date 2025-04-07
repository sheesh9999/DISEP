import React from 'react';
import './DrugInteractionInfographic.css';

interface DrugInteractionInfographicProps {
  drug1: string;
  drug2: string;
  severity: 'high' | 'moderate' | 'low';
  confidence: number;
  prediction: string;
  drug1Description: string;
  drug2Description: string;
}

const DrugInteractionInfographic: React.FC<DrugInteractionInfographicProps> = ({
  drug1,
  drug2,
  severity,
  confidence,
  prediction,
  drug1Description,
  drug2Description
}) => {
  // Helper function to determine interaction type
  const getInteractionType = (drug1: string, drug2: string): string => {
    // Simplified logic - in a real app, this would be based on actual drug properties
    return Math.random() > 0.5 ? "Pharmacodynamic" : "Pharmacokinetic";
  };

  // Helper function to determine affected systems
  const getAffectedSystems = (severity: string): string[] => {
    const systems = {
      high: ["Cardiovascular", "Renal", "Hepatic"],
      moderate: ["Metabolic", "Gastrointestinal"],
      low: ["Minor systemic effects"]
    };
    return systems[severity as keyof typeof systems] || ["Unknown"];
  };

  // Helper function to get monitoring parameters
  const getMonitoringParameters = (severity: string): string[] => {
    const parameters = {
      high: ["Blood pressure", "Renal function", "Liver function", "ECG"],
      moderate: ["Regular vital signs", "Symptom monitoring"],
      low: ["Routine monitoring"]
    };
    return parameters[severity as keyof typeof parameters] || ["Standard monitoring"];
  };

  // Helper function to get clinical recommendations
  const getClinicalRecommendations = (severity: string): string => {
    const recommendations = {
      high: "Avoid combination. If necessary, close monitoring required.",
      moderate: "Use with caution. Monitor for side effects.",
      low: "Generally safe. Monitor as usual."
    };
    return recommendations[severity as keyof typeof recommendations] || "Consult healthcare provider";
  };

  // Helper function to get severity color
  const getSeverityColor = (severity: string): string => {
    const colors = {
      high: "#ff4444",
      moderate: "#ffbb33",
      low: "#00C851"
    };
    return colors[severity as keyof typeof colors] || "#2BBBAD";
  };

  return (
    <div className="drug-interaction-infographic">
      <div className="infographic-header" style={{ backgroundColor: getSeverityColor(severity) }}>
        <h2>Drug Interaction Analysis</h2>
        <div className="severity-badge">{severity.toUpperCase()} RISK</div>
      </div>

      <div className="infographic-content">
        <div className="drug-comparison">
          <div className="drug-info">
            <h3>Drug A: {drug1}</h3>
            <p>{drug1Description}</p>
          </div>
          <div className="interaction-arrow">⟷</div>
          <div className="drug-info">
            <h3>Drug B: {drug2}</h3>
            <p>{drug2Description}</p>
          </div>
        </div>

        <div className="interaction-details">
          <div className="detail-section">
            <h4>Interaction Type</h4>
            <p>{getInteractionType(drug1, drug2)}</p>
          </div>

          <div className="detail-section">
            <h4>Affected Systems</h4>
            <ul>
              {getAffectedSystems(severity).map((system, index) => (
                <li key={index}>{system}</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h4>Monitoring Parameters</h4>
            <ul>
              {getMonitoringParameters(severity).map((param, index) => (
                <li key={index}>{param}</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h4>Clinical Recommendation</h4>
            <p>{getClinicalRecommendations(severity)}</p>
          </div>

          <div className="detail-section">
            <h4>Interaction Details</h4>
            <p>{prediction}</p>
          </div>

          <div className="confidence-meter">
            <h4>Confidence Level</h4>
            <div className="confidence-bar">
              <div 
                className="confidence-fill"
                style={{ width: `${confidence * 100}%` }}
              ></div>
              <span>{Math.round(confidence * 100)}% Confidence</span>
            </div>
          </div>
        </div>

        <div className="severity-scale">
          <div className="scale-label">Severity Scale</div>
          <div className="scale-bars">
            <div className="scale-bar low">Low</div>
            <div className="scale-bar moderate">Moderate</div>
            <div className="scale-bar high">High</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugInteractionInfographic; 