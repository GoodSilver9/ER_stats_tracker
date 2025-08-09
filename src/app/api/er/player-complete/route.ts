import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const playerName = searchParams.get("playerName");
    const apiKey = process.env.ER_API_KEY;

    if (!apiKey || !playerName) {
      return NextResponse.json(
        { error: "API 키가 설정되지 않았거나 플레이어 이름이 필요합니다." },
        { status: 400 }
      );
    }

    const completeData = {
      playerName,
      success: false,
      data: {
        userInfo: null,
        stats: null,
        games: null,
        recentMatches: null,
      },
      errors: [],
    };

    try {
      // 1단계: nickname API로 userNum 구하기
      console.log(`[통합API] 1단계: nickname API 호출 - ${playerName}`);

      const nicknameResponse = await fetch(
        `https://open-api.bser.io/v1/user/nickname?query=${encodeURIComponent(
          playerName
        )}`,
        {
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (!nicknameResponse.ok) {
        throw new Error(`nickname API 호출 실패: ${nicknameResponse.status}`);
      }

      const nicknameData = await nicknameResponse.json();
      console.log(
        `[통합API] nickname API 전체 응답:`,
        JSON.stringify(nicknameData, null, 2)
      );

      // userNum 추출 - 다양한 경우의 수 확인하고 디버깅
      let userNum = null;

      console.log(`[통합API] 응답 구조 분석:`, {
        hasData: !!nicknameData?.data,
        isArray: Array.isArray(nicknameData),
        dataIsArray: Array.isArray(nicknameData?.data),
        keys: Object.keys(nicknameData || {}),
      });

      // 모든 가능한 경로에서 userNum 찾기
      const findUserNum = (obj: any, path = ""): any => {
        if (!obj) return null;

        // 직접 userNum이 있는 경우
        if (obj.userNum) {
          console.log(`[통합API] userNum 발견: ${path}.userNum =`, obj.userNum);
          return obj.userNum;
        }

        // 객체나 배열을 재귀적으로 탐색
        if (typeof obj === "object") {
          for (const [key, value] of Object.entries(obj)) {
            if (Array.isArray(value)) {
              for (let i = 0; i < value.length; i++) {
                const result = findUserNum(value[i], `${path}.${key}[${i}]`);
                if (result) return result;
              }
            } else {
              const result = findUserNum(value, `${path}.${key}`);
              if (result) return result;
            }
          }
        }
        return null;
      };

      userNum = findUserNum(nicknameData, "root");

      // 추가 검사 (기존 로직도 유지)
      if (!userNum) {
        console.log(`[통합API] 기존 방식으로 다시 시도...`);

        if (nicknameData?.data?.userNum) {
          userNum = nicknameData.data.userNum;
        } else if (nicknameData?.userNum) {
          userNum = nicknameData.userNum;
        } else if (
          Array.isArray(nicknameData?.data) &&
          nicknameData.data.length > 0
        ) {
          userNum = nicknameData.data[0]?.userNum;
        } else if (Array.isArray(nicknameData) && nicknameData.length > 0) {
          userNum = nicknameData[0]?.userNum;
        }
      }

      if (!userNum) {
        console.error(`[통합API] userNum을 찾을 수 없음!`);
        throw new Error(
          `userNum을 찾을 수 없습니다. 응답을 콘솔에서 확인하세요.`
        );
      }

      completeData.data.userInfo = {
        userNum,
        nickname: playerName,
        searchResult: nicknameData,
      };

      console.log(`[통합API] userNum 획득: ${userNum}`);

      // 2단계: games API로 나머지 데이터 구하기
      console.log(`[통합API] 2단계: games API 호출 - userNum: ${userNum}`);

      const gamesResponse = await fetch(
        `https://open-api.bser.io/v1/user/games/${userNum}`,
        {
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      let seasonId = "25"; // 기본값
      let gamesData = null;

      if (gamesResponse.ok) {
        gamesData = await gamesResponse.json();

        // seasonId 추출
        if (gamesData?.data?.userGames?.[0]?.seasonId) {
          seasonId = gamesData.data.userGames[0].seasonId;
          console.log(`[통합API] seasonId 발견: ${seasonId}`);
        }

        completeData.data.games = {
          seasonId,
          totalGames: gamesData?.data?.userGames?.length || 0,
          recentGames: gamesData?.data?.userGames?.slice(0, 10) || [],
          fullData: gamesData,
        };
      } else {
        completeData.errors.push(
          `게임 기록 조회 실패: ${gamesResponse.status}`
        );
      }

      // 3단계: 통계 조회
      console.log(`[통합API] 3단계: 통계 조회`);

      const statsResponse = await fetch(
        `https://open-api.bser.io/v1/user/stats/${userNum}/${seasonId}`,
        {
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();

        // 통계 데이터 파싱
        const parsedStats = {
          기본정보: {
            userNum: statsData.data?.userNum,
            nickname: statsData.data?.nickname,
            seasonId: statsData.data?.seasonId,
          },
          전체통계: statsData.data?.userStats?.[0]
            ? {
                총게임수: statsData.data.userStats[0].totalGames,
                총승수: statsData.data.userStats[0].totalWins,
                승률:
                  statsData.data.userStats[0].totalGames > 0
                    ? `${(
                        (statsData.data.userStats[0].totalWins /
                          statsData.data.userStats[0].totalGames) *
                        100
                      ).toFixed(1)}%`
                    : "0%",
                평균등수: statsData.data.userStats[0].averageRank,
                평균킬: statsData.data.userStats[0].averageKills,
                평균어시스트: statsData.data.userStats[0].averageAssistants,
              }
            : null,
          캐릭터별통계:
            statsData.data?.characterStats?.slice(0, 10).map((char: any) => ({
              캐릭터코드: char.characterCode,
              게임수: char.totalGames,
              승수: char.totalWins,
              승률:
                char.totalGames > 0
                  ? `${((char.totalWins / char.totalGames) * 100).toFixed(1)}%`
                  : "0%",
              평균등수: char.averageRank,
              평균킬: char.averageKills,
              평균어시스트: char.averageAssistants,
            })) || [],
          원본데이터: statsData,
        };

        completeData.data.stats = parsedStats;
      } else {
        completeData.errors.push(`통계 조회 실패: ${statsResponse.status}`);
      }

      // 4단계: 최근 매치 조회 (선택적)
      console.log(`[통합API] 4단계: 최근 매치 조회`);

      if (gamesData?.data?.userGames?.length > 0) {
        const recentGameId = gamesData.data.userGames[0].gameId;

        const matchResponse = await fetch(
          `https://open-api.bser.io/v1/games/${recentGameId}`,
          {
            headers: {
              "x-api-key": apiKey,
              "Content-Type": "application/json",
            },
          }
        );

        if (matchResponse.ok) {
          const matchData = await matchResponse.json();
          completeData.data.recentMatches = {
            최근게임: matchData,
          };
        } else {
          completeData.errors.push(
            `매치 상세 조회 실패: ${matchResponse.status}`
          );
        }
      }

      completeData.success = true;
      console.log(
        `[통합API] 완료: ${playerName} - 총 ${completeData.errors.length}개 오류`
      );

      return NextResponse.json(completeData);
    } catch (apiError) {
      console.error("통합 API 호출 실패:", apiError);
      completeData.errors.push(
        apiError instanceof Error ? apiError.message : String(apiError)
      );

      return NextResponse.json(completeData, { status: 500 });
    }
  } catch (error) {
    console.error("통합 플레이어 데이터 조회 오류:", error);
    return NextResponse.json(
      { error: "통합 플레이어 데이터 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
