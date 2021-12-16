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
): string[] {
  const convertedSkills: string[] = [];
  skills.forEach((skill) => {
    switch (skill.value) {
      case "Angular":
        convertedSkills.push(
          "https://res.cloudinary.com/dykscnyvu/image/upload/c_scale,h_60/v1639653441/Moddusey/angular_kyvxhd.png"
        );
        break;
      case "C++":
        convertedSkills.push(
          "https://res.cloudinary.com/dykscnyvu/image/upload/c_scale,h_60/v1639653440/Moddusey/cpp_lwmvpw.png"
        );
        break;
      case "C#":
        convertedSkills.push(
          "https://res.cloudinary.com/dykscnyvu/image/upload/c_scale,w_60/v1639653441/Moddusey/csharp_puilbs.png"
        );
        break;
      case "GraphQL":
        convertedSkills.push(
          "https://res.cloudinary.com/dykscnyvu/image/upload/c_scale,w_60/v1639653441/Moddusey/graphql_qt15lo.png"
        );
        break;
      case "Go":
        convertedSkills.push(
          "https://res.cloudinary.com/dykscnyvu/image/upload/c_scale,h_60/v1639653441/Moddusey/go_d6bjpi.png"
        );
        break;
      case "NodeJS":
        convertedSkills.push(
          "https://res.cloudinary.com/dykscnyvu/image/upload/c_scale,w_60/v1639663916/nodejs_xy6fwv.png"
        );
        break;
      case "PHP":
        convertedSkills.push(
          "https://res.cloudinary.com/dykscnyvu/image/upload/c_scale,h_60/v1639653833/Moddusey/pngegg_cksrsd.png"
        );
        break;
      case "React":
        convertedSkills.push(
          "https://res.cloudinary.com/dykscnyvu/image/upload/c_scale,w_60/v1639653935/Moddusey/react_lw3ygn.png"
        );
        break;
      case "React Native":
        convertedSkills.push(
          "https://res.cloudinary.com/dykscnyvu/image/upload/c_scale,w_60/v1639653886/Moddusey/reactn_zlwuqx.png"
        );
        break;
      case "SQL":
        convertedSkills.push(
          "https://res.cloudinary.com/dykscnyvu/image/upload/c_scale,h_60/v1639653440/Moddusey/sql_ekvykx.png"
        );
        break;
      case "TypeScript":
        convertedSkills.push(
          "https://res.cloudinary.com/dykscnyvu/image/upload/c_scale,w_60/v1639653440/Moddusey/ts_ozbo78.png"
        );
        break;
      case "VueJS":
        convertedSkills.push(
          "https://res.cloudinary.com/dykscnyvu/image/upload/c_scale,h_60/v1639653440/Moddusey/vue_xovvoh.png"
        );
        break;
      default:
        break;
    }
  });
  return convertedSkills;
}
