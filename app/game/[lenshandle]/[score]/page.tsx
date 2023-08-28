"use client";

declare global {
  interface Window {
    score: any;
  }
}

import React, { useEffect, useState } from "react";
import { Game } from "../../main";
import { useActiveProfile } from "@lens-protocol/react-web";

// http://localhost:3000/game/fearless99/400

export default function page({ params }: { params: any }) {
  const [gameover, setGameover] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const {
    data: userProfile,
    error: userProfileError,
    loading: isUserProfileLoading,
  } = useActiveProfile();

  useEffect(() => {
    if (!isUserProfileLoading && !userProfile) {
      window.location.href = `/?red=/game/${params.lenshandle}/${params.score}&challenger=${params.lenshandle}&score=${params.score}`;
    }
  }, [isUserProfileLoading]);

  useEffect(() => {
    const canvas: any = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    let game = new Game(ctx, canvas);
    game.setGameOverCallback((score) => {
      setGameover(true);
      setGameWon(score.score > parseInt(params.score));
      if (score.score > parseInt(params.score))
        alert(`You beat ${params.lenshandle}!`);
    });
    game.setScoreCallback((score) => {
      window.score = score;
    });
    game.start();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: "1000px" }}>
        {!gameover ? <canvas style={{ width: "100%" }} id="game"></canvas> : ""}
      </div>
      <div
        style={{ marginTop: "30px", display: "flex", flexDirection: "column" }}
      >
        {gameover ? (
          <div>
            {gameWon ? (
              <h1>Congrats! {userProfile?.handle}! You won</h1>
            ) : (
              <h1>Sorry, {userProfile?.handle}! you lost</h1>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
