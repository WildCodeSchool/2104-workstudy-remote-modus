const fakeDataPosts = [
  {
    title:
      "VSCode: open files related to a given project on a specific editor side",
    skills: ["JavaScript"],
    wysiwyg: `
    I am working on a vscode workspace, and in this workspace I have two separate projects that I need to constantly open files from one or the other. The explorer window on the left shows both projects, and were added using the Add folder to workspace... option if it's useful to know.
    
    Now, since the projects have similar structure (both have an api.py file for example), I started keeping the open files from project1 on the left side of the editor, and I'm using the right side for project2. When I open a new file, it gets placed on the side of the screen that I have currently focused.
    
    What I would like, is to know if there's an option to force files from project1 to stay on the left, and files from project2 to stay on the right.
    
    The image below shows what I am trying to accomplish`,
  },
  {
    title: "converting strategy to alerts in pine script",
    skills: ["React"],
    wysiwyg: `**am trying to convert strategy to alerts but after trying many time cant able to convert it can any one help me out on this so can learn better any one can change it. need only alerts long and short ** what i do to get alerts read this article change every thing that i found on it but nothing change and found errors`,
  },
  {
    title: "useEffect",
    skills: ["React", "JavaScript"],
    wysiwyg: `In recent years, microservices have exploded in popularity. Many organizations use this type of architecture to avoid the limitations of large, monolithic backends. While much has been written about this, many companies continue to struggle with 'monolithic frontends'.

    In this article, we will describe a trend that is breaking down 'frontend monoliths' into much smaller, more manageable pieces. And how this architecture can increase effectiveness and efficiency across teams. Figure 1 shows an application where the frontend consists of a  'frontend monolith' and the backend consists of several microservices.`,
  },
];

export default fakeDataPosts;
