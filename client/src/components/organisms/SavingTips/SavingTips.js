import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Advice from "../../../assets/icons/ADVICE.png";

const tipsData = [
  {
    text: "Oszczędzaj regularnie, nawet małe kwoty.",
  },
  {
    text: "Twórz budżet i trzymaj się go.",
  },
  {
    text: "Unikaj zbędnych wydatków.",
  },
  {
    text: "Rozważ inwestowanie na przyszłość.",
  },
];

const SavingsTips = () => {
  const [index, setIndex] = useState(0);

  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    reset: true,
    onRest: () => {
      setIndex((prevIndex) => (prevIndex + 1) % tipsData.length);
    },
    config: { duration: 2000, tension: 50, friction: 5 }, // Przykładowa konfiguracja
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % tipsData.length);
    }, 4000); // Czas wyświetlania jednej porady to 4 sekundy

    return () => clearInterval(intervalId);
  }, []);

  return (
    <animated.div style={props}>
      <Card>
        <CardContent style={{}}>
          <Typography variant="body1">{tipsData[index].text}</Typography>
        </CardContent>
      </Card>
    </animated.div>
  );
};

export default SavingsTips;
