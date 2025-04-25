fetch('study.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('네트워크 응답이 좋지 않습니다.');
        }
        return response.json();
    })
    .then(data => {
        const studyGroupList = document.getElementById('studyGroupList');
        data.studyGroups.forEach(group => {
            const groupDiv = document.createElement('div');
            groupDiv.classList.add('group');

            groupDiv.innerHTML = `
                <a href="#">${group.title}</a>
                <p>${group.interest}</p>
                <p>${group.location}</p>
                <p>${group.availableTime}</p>
                <p>${group.maxParticipants}명</p>
            `;
            studyGroupList.appendChild(groupDiv);
        });
    })
    .catch(error => {
        console.error('문제가 발생했습니다:', error);
    });