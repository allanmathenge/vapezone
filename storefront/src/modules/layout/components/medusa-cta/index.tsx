import { Text } from "@medusajs/ui"
import { FaFacebook, FaInstagram, FaEnvelope, FaXTwitter } from "react-icons/fa6";

const MedusaCTA = () => {
  return (
    <Text className="flex txt-compact-small-plus items-center">
      <ul className="flex gap-2 text-ui-fg-subtle">
        <li>
          <a href="https://twitter.com/vapezonekenya" target="_blank" rel="noreferrer" className="hover:text-ui-fg-base transition-colors">
            <FaXTwitter className="hover:text-black" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/vapezonekenya/" target="_blank" rel="noreferrer" className="hover:text-ui-fg-base transition-colors">
            <FaInstagram className="hover:text-pink-500" />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/profile.php?id=61579752452893" target="_blank" rel="noreferrer" className="hover:text-ui-fg-base transition-colors">
            <FaFacebook className="hover:text-blue-600" />
          </a>
        </li>
        <li>
          <a href="mailto:vapezonekenya@gmail.com" target="_blank" rel="noreferrer" className="hover:text-ui-fg-base transition-colors">
            <FaEnvelope className="hover:text-red-500" />
          </a>
        </li>
      </ul>
    </Text>
  )
}

export default MedusaCTA
