<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GameForge - 회원 탈퇴</title>
</head>
<body>
    <div id="header"></div>

    <p>탈퇴를 원하시면 "회원 탈퇴"를 입력하세요.</p>
    <input type="text" id="withdraw-input" placeholder="회원탈퇴를 입력하세요" />
    <button id="withdraw-btn" disabled>탈퇴</button>

    <script src="auth.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            fetch('header.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('header').innerHTML = data;
                    checkLoginStatus(); // 헤더 로드 후 로그인 상태 확인
                    const logoutButton = document.getElementById('logout-btn');
                    if (logoutButton) {
                        logoutButton.addEventListener('click', logout);
                    }
                })
                .catch(error => console.error('헤더 로드 중 오류 발생:', error));

            // 로그인 여부 확인
            if (!localStorage.getItem('token')) {
                alert('로그인 후 이용해주세요');
                window.location.href = 'login.html';
            }
        });

        // 입력 이벤트 처리
        document.getElementById('withdraw-input').addEventListener('input', function() {
            const inputText = this.value;
            const withdrawButton = document.getElementById('withdraw-btn');

            // "회원탈퇴"와 일치하는지 확인
            if (inputText === '회원 탈퇴') {
                withdrawButton.disabled = false; // 버튼 활성화
            } else {
                withdrawButton.disabled = true; // 버튼 비활성화
            }
        });

        // 탈퇴 버튼 클릭 이벤트 처리
        document.getElementById('withdraw-btn').addEventListener('click', function() {
            const token = getAuthToken(); // auth.js에서 토큰 가져오기
            if (!token) {
                alert('로그인이 필요합니다.');
                return;
            }

            fetch('https://ludorium.store/api/user/mypage', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('회원탈퇴 요청에 실패했습니다.');
                }
                return response.json();
            })
            .then(data => {
                // 성공적으로 요청이 완료된 경우 처리할 로직
                alert('회원탈퇴 요청이 완료되었습니다.');
                console.log(data); // 서버의 응답 데이터 확인
                // 탈퇴 후 메인 페이지로 이동
                window.location.href = 'main.html';
            })
            .catch(error => {
                // 에러 처리
                console.error('Error:', error);
                alert('회원탈퇴 요청 중 오류가 발생했습니다.');
            });
        });
    </script>
</body>
</html>
