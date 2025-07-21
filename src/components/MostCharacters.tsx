import React, { useRef } from "react";

interface Character {
  name: string;
  image: string | { src: string };
  background: string | { src: string };
  winRate: number;
  games: number;
}

interface MostCharactersProps {
  characters: Character[];
  selectedCharacter: string;
  onCharacterSelect: (name: string) => void;
}

const MostCharacters: React.FC<MostCharactersProps> = ({
  characters,
  selectedCharacter,
  onCharacterSelect,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY * 2; // 스크롤 속도 2배
    }
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <h3
        style={{
          color: "#ff8800",
          marginBottom: 16,
          fontSize: 18,
          fontWeight: 600,
          flexShrink: 0,
        }}
      >
        캐릭터 선택
      </h3>
      <div
        ref={scrollContainerRef}
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          paddingBottom: 8,
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
          flex: 1,
          alignItems: "flex-start",
          cursor: "grab",
        }}
        className="character-scroll"
        onWheel={handleWheel}
      >
        {characters.map((char) => (
          <div
            key={char.name}
            onClick={() => onCharacterSelect(char.name)}
            style={{
              cursor: "pointer",
              border:
                char.name === selectedCharacter
                  ? "2px solid #ff8800"
                  : "1px solid #444",
              borderRadius: 8,
              padding: 8,
              background: "#23272e",
              boxShadow:
                char.name === selectedCharacter
                  ? "0 0 12px 0 #ff880033"
                  : "none",
              transition: "border 0.2s, box-shadow 0.2s",
              minWidth: 85,
              width: 85,
              height: 110,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img
              src={typeof char.image === "string" ? char.image : char.image.src}
              alt={char.name}
              style={{
                width: 45,
                height: 45,
                objectFit: "cover",
                borderRadius: 8,
                marginBottom: 6,
              }}
            />
            <div
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 13,
                lineHeight: 1.1,
                marginBottom: 3,
              }}
            >
              {char.name}
            </div>
            <div
              style={{
                color: "#bfc9d1",
                fontSize: 11,
                lineHeight: 1.1,
              }}
            >
              {char.winRate}% ({char.games})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostCharacters;
