import React, { useEffect, useState } from "react";
import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import { Button } from "./components/Button";
import InfoItem from "./components/InfoItem";
import RestartIcon from "./svgs/restart.svg";
import { GridItemType } from "./types/GridItemType";
import { items } from "./data/items";
import GridItem from "./components/GridItem";
import { formarTimeElapsed } from "./helpers/formarTimeElapsed";

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreatGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) setTimeElapsed(timeElapsed + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  const resetAndCreatGrid = () => {
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++)
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false,
      });

    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }

        tmpGrid[pos].item = i;
      }
    }

    setGridItems(tmpGrid);

    setPlaying(true);
  };

  const handleItemClick = (index: number) => {};

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" alt="" />
        </C.LogoLink>
        <C.InfoArea>
          {timeElapsed}
          <InfoItem label="Tempo" value={formarTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimento" value="0" />
        </C.InfoArea>

        <Button
          label="Reiniciar"
          icon={RestartIcon}
          onClick={resetAndCreatGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
