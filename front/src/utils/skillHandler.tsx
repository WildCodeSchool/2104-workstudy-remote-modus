function skillHandler(skills: string[]): { value: string }[] {
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

export default skillHandler;
