import React from 'react';

export const StaticFooter = React.memo(function StaticFooter() {
  return (
    <footer className="static-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>Hintze Hall</h2>
          <p className="footer-sub">Natural History Museum • London</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Explore</h4>
            <a href="#">The Museum</a>
            <a href="#">Hope the Whale</a>
            <a href="#">Virtual Tours</a>
          </div>
          <div className="footer-col">
            <h4>Learn</h4>
            <a href="#">Dinosaurs</a>
            <a href="#">Human Evolution</a>
            <a href="#">Oceans</a>
          </div>
          <div className="footer-col">
            <h4>About</h4>
            <a href="#">Google Arts & Culture</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Natural History Museum & Google Arts Experiments Reference.</p>
      </div>
    </footer>
  );
});
