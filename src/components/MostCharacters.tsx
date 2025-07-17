import React from "react";

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
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          paddingBottom: 8,
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
          flex: 1,
          alignItems: "flex-start",
        }}
        className="character-scroll"
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
              minWidth: 80,
              width: 80,
              height: 100,
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
                width: 40,
                height: 40,
                objectFit: "cover",
                borderRadius: 8,
                marginBottom: 4,
              }}
            />
            <div
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 12,
                lineHeight: 1.1,
                marginBottom: 2,
              }}
            >
              {char.name}
            </div>
            <div
              style={{
                color: "#bfc9d1",
                fontSize: 10,
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
