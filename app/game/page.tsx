"use client";

declare global {
  interface Window {
    score: any;
  }
}

import { useEffect, useState } from "react";

import { Game } from "./main";

export default () => {
  const [gameover, setGameover] = useState<boolean>(false);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = document.getElementById(
      "game"
    ) as HTMLCanvasElement;
    if (!canvas) throw new Error("Canvas not found");
    const ctx = canvas.getContext("2d");

    let game = new Game(ctx, canvas);
    game.setGameOverCallback((score) => {
      setGameover(true);
    });
    game.setScoreCallback((score) => {
      window.score = score;
    });
    game.start();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ maxWidth: "1000px" }}>
        <canvas style={{ width: "100%" }} id="game"></canvas>
      </div>
      <div style={{ marginTop: "30px" }}>
        {gameover ? (
          <>
            <a href="/game" className="button">
              Try again
            </a>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
