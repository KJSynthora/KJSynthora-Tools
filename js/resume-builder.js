const roleDropdown = document.getElementById("primaryRole");
const skillSuggestions = document.getElementById("skillSuggestions");
const skillsInput = document.getElementById("skillsInput");

roleDropdown.addEventListener("change", () => {

    const selectedRole = roleDropdown.value;

    const roleData = ROLE_SKILL_MATRIX[selectedRole];

    skillSuggestions.innerHTML = "";

    if(roleData){

        const allSkills = [
            ...roleData.core,
            ...roleData.tools,
            ...roleData.certifications
        ];

        allSkills.forEach(skill => {

            const skillTag = document.createElement("button");

            skillTag.className = "skill-pill";

            skillTag.innerText = "+ " + skill;

            skillTag.onclick = () => addSkill(skill);

            skillSuggestions.appendChild(skillTag);

        });

    }

});

function addSkill(skill){

    let current = skillsInput.value.trim();

    if(current.includes(skill)) return;

    if(current.length > 0){
        skillsInput.value += ", " + skill;
    }else{
        skillsInput.value = skill;
    }

}
