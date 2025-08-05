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

    // 실제 ER API 호출 테스트
    try {
      // 실제 ER API 호출
      const apiEndpoint = `https://open-api.bser.io/v1/user/nickname/${encodeURIComponent(
        playerName
      )}`;
      console.log(`API 엔드포인트: ${apiEndpoint}`);

      const response = await fetch(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Player API 응답 상태:", response.status);
      console.log(
        "Player API 응답 헤더:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Player API 오류 응답:", errorText);
        throw new Error(`API 호출 실패: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Player API 성공 응답:", data);
      return NextResponse.json(data);
    } catch (apiError) {
      console.error("실제 Player API 호출 실패:", apiError);

      // API 호출 실패 시 더미 데이터 반환 (개발용)
      const dummyData = {
        playerName: playerName,
        level: 50,
        rank: "Diamond",
        totalMatches: 150,
        winRate: 65.2,
        mostPlayedCharacter: "Adela",
        lastUpdated: new Date().toISOString(),
        message: "실제 API 엔드포인트 확인 후 수정 필요",
        apiError:
          apiError instanceof Error ? apiError.message : String(apiError),
      };

      return NextResponse.json(dummyData);
    }
  } catch (error) {
    console.error("플레이어 정보 조회 오류:", error);
    return NextResponse.json(
      { error: "플레이어 정보 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
