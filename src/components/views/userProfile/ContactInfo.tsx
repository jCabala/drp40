import { faEnvelope, faPhone, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Example hardcoded contact information
type Props = {
  email: string;
  phoneNumber?: string;
  isMyProfile: boolean;
};

const ContactInfo = ({ email, phoneNumber, isMyProfile }: Props) => (
  <>
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <FontAwesomeIcon icon={faLock} className="text-yellow-500" />
      Contact Information
    </h2>
    <p className="text-gray-700 flex items-center gap-2">
      <FontAwesomeIcon icon={faEnvelope} className="text-yellow-500" />
      <strong>Email:</strong> {email}
    </p>
    {phoneNumber && (
      <p className="text-gray-700 flex items-center gap-2">
        <FontAwesomeIcon icon={faPhone} className="text-yellow-500" />
        <strong>Phone Number:</strong> {phoneNumber}
      </p>
    )}
    {isMyProfile && (
      <p className="text-gray-500 text-sm mt-2 flex items-center gap-2">
        <FontAwesomeIcon icon={faLock} className="text-yellow-500" />
        Only you can see your contact information here.
      </p>
    )}
  </>
);

export default ContactInfo;
