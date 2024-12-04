import React, { useEffect } from "react";
import "../Styles/SplashScreen.css";

const SplashScreen = ({ onSplashEnd }) => {
  useEffect(() => {
    const intro = document.querySelector(".intro");
    const logoSpans = document.querySelectorAll(".logo");

    // Trigger logo animations
    setTimeout(() => {
      logoSpans.forEach((span, idx) => {
        setTimeout(() => {
          span.classList.add("active");
        }, (idx + 1) * 400);
      });

      setTimeout(() => {
        logoSpans.forEach((span, idx) => {
          setTimeout(() => {
            span.classList.remove("active");
            span.classList.add("fade");
          }, idx * 50);
        });
      }, 2000);

      // Fade out splash screen and notify parent component
      setTimeout(() => {
        intro.classList.add("fade-out");
        setTimeout(() => {
          onSplashEnd(); // Notify that the splash screen has ended
        }, 1000); // Matches the CSS transition duration
      }, 2300);
    });
  }, [onSplashEnd]);

  return (
    <div className="intro">
      <h1 className="logo-header">
        <span className="logo">G1</span>
        <span className="logo">68.</span>
      </h1>
    </div>
  );
};

export default SplashScreen;
