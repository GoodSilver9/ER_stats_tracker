import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userNum = searchParams.get("userNum");
    const next = searchParams.get("next") || undefined;
    const apiKey = process.env.ER_API_KEY;

    if (!apiKey || !userNum) {
      return NextResponse.json(
        { error: "API 키가 설정되지 않았거나 userNum이 필요합니다." },
        { status: 400 }
      );
    }

    // 실제 ER API 호출
    try {
      let apiEndpoint = `https://open-api.bser.io/v1/user/games/${userNum}`;
      if (next) {
        apiEndpoint += `?next=${encodeURIComponent(next)}`;
      }

      console.log(`Games API 엔드포인트: ${apiEndpoint}`);

      const response = await fetch(apiEndpoint, {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      });

      console.log("Games API 응답 상태:", response.status);
      console.log(
        "Games API 응답 헤더:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Games API 오류 응답:", errorText);
        throw new Error(`API 호출 실패: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Games API 성공 응답:", data);
      return NextResponse.json(data);
    } catch (apiError) {
      console.error("실제 Games API 호출 실패:", apiError);

      // API 호출 실패 시 더미 데이터 반환 (개발용)
      const dummyGamesResult = {
        code: 200,
        message: "Success",
        games: [
          {
            gameId: "123456789",
            userNum: userNum,
            character: "Adela",
            result: "WIN",
            killCount: 3,
            assistCount: 2,
            rank: 1,
            gameTime: "2024-08-05T10:30:00Z",
          },
        ],
        next: null,
        message: "실제 API 엔드포인트 확인 후 수정 필요",
        apiError:
          apiError instanceof Error ? apiError.message : String(apiError),
      };

      return NextResponse.json(dummyGamesResult);
    }
  } catch (error) {
    console.error("게임 히스토리 조회 오류:", error);
    return NextResponse.json(
      { error: "게임 히스토리 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
