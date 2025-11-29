import React from 'react';

const ParticipationTimeline = ({ participations }) => {
  return (
    <div className="participation-timeline">
      <h2>🎯 My Participation History</h2>
      
      {participations.length > 0 ? (
        <div className="timeline">
          {participations.map(participation => (
            <div key={participation.id} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>{participation.activityName}</h3>
                <p className="role"><strong>Role:</strong> {participation.role}</p>
                <p className="duration">⏱️ <strong>Duration:</strong> {participation.duration}</p>
                <p className="dates">
                  📅 {new Date(participation.startDate).toLocaleDateString('en-IN')} - {new Date(participation.endDate).toLocaleDateString('en-IN')}
                </p>
                {participation.skills && participation.skills.length > 0 && (
                  <div className="skills">
                    <strong>Skills:</strong>
                    <div className="skill-tags">
                      {participation.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data">
          <p>📭 No participation records yet.</p>
        </div>
      )}
    </div>
  );
};

export default ParticipationTimeline;
