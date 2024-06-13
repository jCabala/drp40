import {
  faWineGlassAlt,
  faSmokingBan,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  drinkFrequency?: string;
  smoker?: string;
  sleepHours?: string;
};

const LifestyleInfo = ({ drinkFrequency, smoker, sleepHours }: Props) => (
  <>
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <FontAwesomeIcon icon={faBed} className="text-green-500" />
      Lifestyle Information
    </h2>
    {drinkFrequency && (
      <p className="text-gray-700 flex items-center gap-2">
        <FontAwesomeIcon icon={faWineGlassAlt} className="text-green-500" />
        <strong>Drink Frequency:</strong> {drinkFrequency}
      </p>
    )}
    {smoker && (
      <p className="text-gray-700 flex items-center gap-2">
        <FontAwesomeIcon icon={faSmokingBan} className="text-green-500" />
        <strong>Smoker:</strong> {smoker}
      </p>
    )}
    {sleepHours && (
      <p className="text-gray-700 flex items-center gap-2">
        <FontAwesomeIcon icon={faBed} className="text-green-500" />
        <strong>Sleep Hours:</strong> {sleepHours}
      </p>
    )}
  </>
);

export default LifestyleInfo;
