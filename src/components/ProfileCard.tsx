import React from "react";

interface ProfileCardProps {
  nickname: string;
  tier: string;
  tierImage: string | { src: string };
  totalRP: number;
  tierRP: number;
  ranking: number;
  percentage: number;
  asiaRanking: number;
  asiaPercentage: number;
  winRate: number;
  totalGames: number;
  avgTK: number;
  avgRank: number;
  avgKill: number;
  avgAssist: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  nickname,
  tier,
  tierImage,
  totalRP,
  tierRP,
  ranking,
  percentage,
  asiaRanking,
  asiaPercentage,
  winRate,
  totalGames,
  avgTK,
  avgRank,
  avgKill,
  avgAssist,
}) => {
  return (
    <div
      style={{
        background: "#23272e",
        borderRadius: 20,
        padding: 32,
        color: "#fff",
        minWidth: 280,
        maxWidth: 320,
      }}
    >
      {/* 헤더 - 닉네임 */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#ff8800",
            marginBottom: 8,
            letterSpacing: 1,
          }}
        >
          {nickname}
        </h2>
        <div style={{ color: "#bfc9d1", fontSize: 14 }}>검색된 유저 정보</div>
      </div>

      {/* 티어 정보 */}
      <div
        style={{
          background: "#1a1d23",
          borderRadius: 16,
          padding: 20,
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            marginBottom: 12,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={typeof tierImage === "string" ? tierImage : tierImage.src}
            alt={tier}
            style={{
              width: 64,
              height: 64,
              objectFit: "contain",
            }}
          />
        </div>
        {/* RP 정보 */}
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#ff8800",
              marginBottom: 4,
            }}
          >
            {totalRP.toLocaleString()}RP
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#00eaff",
              marginBottom: 2,
            }}
          >
            {tier} - {tierRP.toLocaleString()} RP
          </div>
        </div>

        {/* 랭킹 정보 */}
        <div style={{ marginBottom: 8 }}>
          <div
            style={{
              fontSize: 14,
              color: "#fff",
              marginBottom: 2,
            }}
          >
            {ranking.toLocaleString()}위 (상위 {percentage}%)
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#bfc9d1",
            }}
          >
            Asia {asiaRanking.toLocaleString()}위 (상위 {asiaPercentage}%)
          </div>
        </div>
      </div>

      {/* 주요 통계 */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#ff8800",
              }}
            >
              {winRate}%
            </div>
            <div style={{ color: "#bfc9d1", fontSize: 12 }}>승률</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {totalGames}
            </div>
            <div style={{ color: "#bfc9d1", fontSize: 12 }}>총 게임</div>
          </div>
        </div>
      </div>

      {/* 상세 통계 */}
      <div
        style={{
          background: "#1a1d23",
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#ff8800",
              marginBottom: 12,
            }}
          >
            상세 통계
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span style={{ color: "#bfc9d1", fontSize: 13 }}>평균 TK</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{avgTK}</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span style={{ color: "#bfc9d1", fontSize: 13 }}>평균 순위</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#00eaff" }}>
            {avgRank}위
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span style={{ color: "#bfc9d1", fontSize: 13 }}>평균 킬</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{avgKill}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#bfc9d1", fontSize: 13 }}>평균 어시</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{avgAssist}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
