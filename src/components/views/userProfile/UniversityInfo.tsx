import {
  faUniversity,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  universityName?: string;
  graduationYear?: number;
};

const UniversityInfo = ({universityName, graduationYear}: Props) => (
  <>
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <FontAwesomeIcon icon={faUniversity} className="text-blue-500" />
      University Information
    </h2>
    {universityName && <p className="text-gray-700 flex items-center gap-2">
      <FontAwesomeIcon icon={faUniversity} className="text-blue-500" />
      <strong>University:</strong> {universityName}
    </p>}
    {graduationYear && <p className="text-gray-700 flex items-center gap-2">
      <FontAwesomeIcon icon={faGraduationCap} className="text-blue-500" />
      <strong>Graduation Year:</strong> {graduationYear}
    </p>}
  </>
);

export default UniversityInfo;
