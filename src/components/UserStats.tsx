import React from "react";

interface StatData {
  subject: string;
  user: number;
  avg: number;
}

interface UserStatsProps {
  data: {
    nickname: string;
    mostCharacter: string;
    kda: number;
    avgDamage: number;
    avgRank: number;
    avgKill: number;
    clutchRate: number;
  };
  statsData: StatData[];
  tierAvg?: {
    avgDamage: number;
    avgKDA: number;
    avgRank: number;
    avgKill: number;
    avgClutchRate: number;
  };
}

const UserStats: React.FC<UserStatsProps> = ({ data, statsData, tierAvg }) => {
  return (
    <div
      style={{
        marginTop: 32,
        marginBottom: 32,
        background: "#23272e",
        borderRadius: 16,
        padding: 24,
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        <div>
          <div style={{ color: "#bfc9d1", fontSize: 15 }}>KDA</div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{data.kda}</div>
          {tierAvg && (
            <div style={{ color: "#00eaff", fontSize: 12 }}>
              평균: {tierAvg.avgKDA}
            </div>
          )}
        </div>
        <div>
          <div style={{ color: "#bfc9d1", fontSize: 15 }}>평균 딜량</div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{data.avgDamage}</div>
          {tierAvg && (
            <div style={{ color: "#00eaff", fontSize: 12 }}>
              평균: {tierAvg.avgDamage}
            </div>
          )}
        </div>
        <div>
          <div style={{ color: "#bfc9d1", fontSize: 15 }}>평균 순위</div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{data.avgRank}</div>
          {tierAvg && (
            <div style={{ color: "#00eaff", fontSize: 12 }}>
              평균: {tierAvg.avgRank}
            </div>
          )}
        </div>
        <div>
          <div style={{ color: "#bfc9d1", fontSize: 15 }}>평균 킬</div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{data.avgKill}</div>
          {tierAvg && (
            <div style={{ color: "#00eaff", fontSize: 12 }}>
              평균: {tierAvg.avgKill}
            </div>
          )}
        </div>
        <div>
          <div style={{ color: "#bfc9d1", fontSize: 15 }}>클러치율</div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>
            {(data.clutchRate * 100).toFixed(1)}%
          </div>
          {tierAvg && (
            <div style={{ color: "#00eaff", fontSize: 12 }}>
              평균: {(tierAvg.avgClutchRate * 100).toFixed(1)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserStats;
