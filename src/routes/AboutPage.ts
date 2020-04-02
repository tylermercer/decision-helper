import { div, p, b, h3 } from 'markup-as-js';

const ProjectsPage = () => div(
  h3("About"),
  p(
    "Volit is a tool to help you evaluate a set of options given a set of criteria. ",
    b("It does not decide for you,"),
    " rather, it will assign the items a score based on how they compare.")
);

export default ProjectsPage;