import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Card } from "@material-ui/core";

const tips = [
  "Oszczędzaj regularnie, nawet małe kwoty.",
  "Twórz budżet i trzymaj się go.",
  "Unikaj zbędnych wydatków.",
  "Rozważ inwestowanie na przyszłość.",
];

const SavingsTips = () => {
  const [index, setIndex] = useState(0);

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
    onRest: () => {
      setIndex((prevIndex) => (prevIndex + 1) % tips.length);
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <animated.div style={props}>
      <Card>
        <p>{tips[index]}</p>
      </Card>
    </animated.div>
  );
};

export default SavingsTips;
