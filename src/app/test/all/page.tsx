"use client";

import { useState } from "react";
import Link from "next/link";

export default function AllApiTestPage() {
  const [playerName, setPlayerName] = useState("");
  const [result, setResult] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [userNum, setUserNum] = useState<number | null>(null);

  const testApi = async (endpoint: string) => {
    if (!playerName && endpoint !== "ranking") {
      alert("플레이어 이름을 입력해주세요");
      return;
    }

    setLoading(true);
    try {
      let apiEndpoint = endpoint;
      let requestBody: Record<string, unknown> = {};

      // 엔드포인트별로 다른 파라미터 처리
      if (endpoint === "ranking") {
        apiEndpoint = "ranking";
        requestBody = {};
      } else if (endpoint === "player-search") {
        apiEndpoint = "player-search";
        requestBody = { playerName };
      } else {
        requestBody = { playerName };
      }

      let url = `/api/er/${apiEndpoint}`;
      if (playerName && endpoint !== "ranking") {
        url += `?playerName=${encodeURIComponent(playerName)}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      // 플레이어 검색 결과에서 userNum 추출
      if (endpoint === "player-search" && data?.data?.userNum) {
        setUserNum(data.data.userNum);
      }

      setResult(data);
    } catch (error) {
      console.error("API 호출 오류:", error);
      setResult({ error: "API 호출 중 오류가 발생했습니다." });
    } finally {
      setLoading(false);
    }
  };

  // Stats API 테스트 함수 (자동으로 userNum과 seasonId 구하기)
  const testStatsApi = async () => {
    if (!playerName) {
      alert("플레이어 이름을 입력해주세요");
      return;
    }

    setLoading(true);
    try {
      let finalUserNum = userNum;

      // userNum이 없으면 먼저 플레이어 검색
      if (!finalUserNum) {
        console.log("userNum이 없어서 플레이어 검색부터 시작...");

        const playerSearchUrl = `/api/er/player-search?playerName=${encodeURIComponent(
          playerName
        )}`;
        const playerResponse = await fetch(playerSearchUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const playerData = await playerResponse.json();

        // userNum 추출
        if (playerData?.data?.userNum) {
          finalUserNum = playerData.data.userNum;
        } else if (playerData?.userNum) {
          finalUserNum = playerData.userNum;
        } else if (playerData?.user?.userNum) {
          finalUserNum = playerData.user.userNum;
        }

        if (!finalUserNum) {
          setResult({
            error: "플레이어 검색 결과에서 userNum을 찾을 수 없습니다.",
            playerSearchResult: playerData,
          });
          return;
        }

        setUserNum(finalUserNum);
        console.log("userNum 찾음:", finalUserNum);
      }

      // seasonId 구하기 (games API에서 추출)
      console.log("seasonId 구하기 위해 games API 호출...");
      const gamesUrl = `/api/er/games?userNum=${finalUserNum}`;
      const gamesResponse = await fetch(gamesUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const gamesData = await gamesResponse.json();

      // seasonId 추출
      let seasonId = "25"; // 기본값
      if (gamesData?.data?.userGames?.[0]?.seasonId) {
        seasonId = gamesData.data.userGames[0].seasonId;
        console.log("게임 데이터에서 seasonId 찾음:", seasonId);
      } else {
        console.log("seasonId를 찾지 못해서 기본값 사용:", seasonId);
      }

      // 최종 Stats API 호출
      console.log("Stats API 호출...");
      const statsUrl = `/api/er/stats?userNum=${finalUserNum}&seasonId=${seasonId}&playerName=${encodeURIComponent(
        playerName
      )}`;

      const statsResponse = await fetch(statsUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const statsData = await statsResponse.json();

      // 콘솔에 각 단계별 데이터 출력
      console.log("=== STATS API 전체 과정 결과 ===");
      console.log("1. UserNum:", finalUserNum);
      console.log("2. SeasonId:", seasonId);
      console.log("3. Games 데이터:", gamesData);
      console.log("4. Stats 데이터:", statsData);
      console.log("================================");

      // Stats 데이터를 보기 좋게 파싱
      let parsedStats = null;
      if (statsData?.data) {
        parsedStats = {
          기본정보: {
            userNum: statsData.data.userNum,
            nickname: statsData.data.nickname,
            seasonId: statsData.data.seasonId,
          },
          전체통계:
            statsData.data.userStats?.length > 0
              ? {
                  총게임수: statsData.data.userStats[0]?.totalGames,
                  총승수: statsData.data.userStats[0]?.totalWins,
                  승률:
                    statsData.data.userStats[0]?.totalWins &&
                    statsData.data.userStats[0]?.totalGames
                      ? `${(
                          (statsData.data.userStats[0].totalWins /
                            statsData.data.userStats[0].totalGames) *
                          100
                        ).toFixed(1)}%`
                      : "N/A",
                  평균등수: statsData.data.userStats[0]?.averageRank,
                }
              : "통계 데이터 없음",
          캐릭터별통계:
            statsData.data.characterStats?.slice(0, 5).map((char: any) => ({
              캐릭터코드: char?.characterCode || "N/A",
              게임수: char?.totalGames || 0,
              승수: char?.totalWins || 0,
              승률:
                char?.totalGames > 0
                  ? `${((char.totalWins / char.totalGames) * 100).toFixed(1)}%`
                  : "0%",
              평균등수: char?.averageRank || "N/A",
              평균킬: char?.averageKills || 0,
              평균어시스트: char?.averageAssistants || 0,
            })) || [],
        };

        console.log("=== 파싱된 Stats 데이터 ===");
        console.log(parsedStats);
        console.log("========================");
      }

      // 전체 과정 결과 표시
      setResult({
        step1_playerSearch:
          finalUserNum !== userNum ? "자동 실행됨" : "기존 userNum 사용",
        step2_games: gamesData,
        step3_stats_raw: statsData,
        step4_stats_parsed: parsedStats,
        userNum: finalUserNum,
        seasonId: seasonId,
      });
    } catch (error) {
      console.error("Stats API 전체 과정 오류:", error);
      setResult({ error: "Stats API 호출 중 오류가 발생했습니다." });
    } finally {
      setLoading(false);
    }
  };

  // 통합 API 테스트 함수
  const testCompleteApi = async () => {
    if (!playerName) {
      alert("플레이어 이름을 입력해주세요");
      return;
    }

    setLoading(true);
    try {
      console.log("=== 통합 API 호출 시작 ===");

      const response = await fetch(
        `/api/er/player-complete?playerName=${encodeURIComponent(playerName)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const completeData = await response.json();

      console.log("통합 API 결과:", completeData);

      // userNum 추출 및 설정
      if (completeData?.data?.userInfo?.userNum) {
        setUserNum(completeData.data.userInfo.userNum);
      }

      setResult({
        간단요약: {
          플레이어: completeData.playerName,
          성공여부: completeData.success,
          userNum: completeData.data?.userInfo?.userNum,
          총게임수: completeData.data?.stats?.전체통계?.총게임수,
          승률: completeData.data?.stats?.전체통계?.승률,
          최근게임수: completeData.data?.games?.totalGames,
          오류개수: completeData.errors?.length || 0,
        },
        통합API결과: completeData,
      });
    } catch (error) {
      console.error("통합 API 호출 오류:", error);
      setResult({ error: "통합 API 호출 중 오류가 발생했습니다." });
    } finally {
      setLoading(false);
    }
  };

  // 연속 API 호출: 플레이어 검색 → 게임 기록 조회
  const testSequentialApi = async () => {
    if (!playerName) {
      alert("플레이어 이름을 입력해주세요");
      return;
    }

    setLoading(true);
    try {
      // 1단계: 플레이어 검색
      const playerSearchUrl = `/api/er/player-search?playerName=${encodeURIComponent(
        playerName
      )}`;
      const playerResponse = await fetch(playerSearchUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const playerData = await playerResponse.json();

      // 디버깅을 위해 전체 응답 구조를 콘솔에 출력
      console.log(
        "플레이어 검색 API 전체 응답:",
        JSON.stringify(playerData, null, 2)
      );

      // 다양한 경우의 userNum 위치 확인
      let foundUserNum = null;

      if (playerData?.data?.userNum) {
        foundUserNum = playerData.data.userNum;
        console.log("data.userNum에서 발견:", foundUserNum);
      } else if (playerData?.userNum) {
        foundUserNum = playerData.userNum;
        console.log("userNum에서 발견:", foundUserNum);
      } else if (playerData?.user?.userNum) {
        foundUserNum = playerData.user.userNum;
        console.log("user.userNum에서 발견:", foundUserNum);
      } else if (
        Array.isArray(playerData) &&
        playerData.length > 0 &&
        playerData[0]?.userNum
      ) {
        foundUserNum = playerData[0].userNum;
        console.log("배열 첫 번째 요소의 userNum에서 발견:", foundUserNum);
      }
      console.log(playerData);

      if (!foundUserNum) {
        setResult({
          error: "플레이어 검색 결과에서 userNum을 찾을 수 없습니다.",
          playerSearchResult: playerData,
          debug: "응답 구조를 확인하세요",
        });
        return;
      }
      setUserNum(foundUserNum);

      // 2단계: 게임 기록 조회
      const gamesUrl = `/api/er/games?userNum=${foundUserNum}`;
      const gamesResponse = await fetch(gamesUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const gamesData = await gamesResponse.json();

      // 두 결과를 모두 포함한 응답
      setResult({
        step1_playerSearch: playerData,
        step2_gamesData: gamesData,
        userNum: foundUserNum,
      });
    } catch (error) {
      console.error("연속 API 호출 오류:", error);
      setResult({ error: "연속 API 호출 중 오류가 발생했습니다." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link
          href="/test"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          ← 테스트 메인으로 돌아가기
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">🧪 모든 API 테스트 (통합)</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">플레이어 이름:</label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="플레이어 이름을 입력하세요"
        />
        {userNum && (
          <p className="mt-2 text-sm text-gray-600">현재 UserNum: {userNum}</p>
        )}
      </div>

      <div className="mb-6 space-y-4">
        <button
          onClick={() => testApi("player-search")}
          disabled={loading || !playerName}
          className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 text-lg font-semibold w-full"
        >
          플레이어 검색 테스트 (/v1/user/nickname)
        </button>

        <button
          onClick={testSequentialApi}
          disabled={loading || !playerName}
          className="p-4 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400 text-lg font-semibold w-full"
        >
          🔗 플레이어 검색 + 게임 기록 조회 (연속 호출)
        </button>

        <button
          onClick={testStatsApi}
          disabled={loading || !playerName}
          className="p-4 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-400 text-lg font-semibold w-full"
        >
          📊 Stats 조회 테스트 (자동: 플레이어검색→게임조회→Stats)
        </button>

        <button
          onClick={testCompleteApi}
          disabled={loading || !playerName}
          className="p-4 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 text-lg font-semibold w-full"
        >
          🚀 통합 API 테스트 (모든 데이터 한번에!)
        </button>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2">API 호출 중...</p>
        </div>
      )}

      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">결과:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-black">
            {typeof result === "string"
              ? result
              : JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
