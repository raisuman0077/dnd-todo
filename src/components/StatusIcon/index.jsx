import { MdOutlineIncompleteCircle, MdCancelPresentation } from "react-icons/md";
import { TiInputChecked } from "react-icons/ti";
import { GiHourglass } from "react-icons/gi";

const index = ({ status }) => {
  const getStatusIcon = () => {
    switch (status) {
      case "complete":
        return <TiInputChecked />;
      case "incomplete":
        return <MdOutlineIncompleteCircle />;
      case "canceled":
        return <MdCancelPresentation />;
      default:
        return <GiHourglass />;
    }
  };

  return <>{getStatusIcon()}</>;
};

export default index;
