import React from "react";

function HomePage() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    return <div>Nie znaleziono danych użytkownika.</div>;
  }

  return (
    <>
      <div>
        <h1>Witaj na stronie głównej, {storedUser.name}!</h1>
        <image src={storedUser.picture}></image>

        {/* Dodaj inne informacje o użytkowniku */}
      </div>
    </>
  );
}

export default HomePage;
