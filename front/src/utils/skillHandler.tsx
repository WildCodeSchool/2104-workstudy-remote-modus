export function skillHandler(skills: string[]): { value: string }[] {
  const convertedSkills: { value: string }[] = [];
  skills.forEach((skill) => {
    switch (skill) {
      case "Angular":
        convertedSkills.push({ value: "ANG" });
        break;
      case "C++":
        convertedSkills.push({ value: "CCC" });
        break;
      case "C#":
        convertedSkills.push({ value: "CSH" });
        break;
      case "GraphQL":
        convertedSkills.push({ value: "GQL" });
        break;
      case "Go":
        convertedSkills.push({ value: "GO" });
        break;
      case "NodeJS":
        convertedSkills.push({ value: "NODE" });
        break;
      case "PHP":
        convertedSkills.push({ value: "PHP" });
        break;
      case "React":
        convertedSkills.push({ value: "REACT" });
        break;
      case "React Native":
        convertedSkills.push({ value: "REACTN" });
        break;
      case "SQL":
        convertedSkills.push({ value: "SQL" });
        break;
      case "TypeScript":
        convertedSkills.push({ value: "TS" });
        break;
      case "VueJS":
        convertedSkills.push({ value: "VUE" });
        break;
      default:
        break;
    }
  });
  return convertedSkills;
}

export function convertStringToLogo(
  skills: { value: string; label: string }[]
) {
  const convertedSkills: string[] = [];
  skills.forEach((skill) => {
    switch (skill.value) {
      case "Angular":
        convertedSkills.push("../../img/angular.png");
        break;
      case "C++":
        convertedSkills.push("../../img/cpp.png");
        break;
      case "C#":
        convertedSkills.push("../../img/csharp.png");
        break;
      case "GraphQL":
        convertedSkills.push("../../img/graphql.png");
        break;
      case "Go":
        convertedSkills.push("../../img/go.png");
        break;
      case "NodeJS":
        convertedSkills.push("../../img/nodejs.png");
        break;
      case "PHP":
        convertedSkills.push("../../img/php.png");
        break;
      case "React":
        convertedSkills.push("../../img/react.png");
        break;
      case "React Native":
        convertedSkills.push("../../img/reactn.png");
        break;
      case "SQL":
        convertedSkills.push("../../img/sql.png");
        break;
      case "TypeScript":
        convertedSkills.push("../../img/ts.png");
        break;
      case "VueJS":
        convertedSkills.push("../../img/vue.png");
        break;
      default:
        break;
    }
  });
  return convertedSkills;
}

// export default { skillHandler, convertStringToLogo };
