import { Text } from "@medusajs/ui"
import { FaFacebook, FaInstagram, FaEnvelope, FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";

const MedusaCTA = () => {
  return (
    <div className="flex gap-2 text-ui-fg-subtle txt-compact-small-plus items-center">
        <li className="list-none">
          <a href="https://twitter.com/vapezonekenya" target="_blank" rel="noreferrer" className="hover:text-ui-fg-base transition-colors">
            <FaXTwitter className="hover:text-black" />
          </a>
        </li>
        <li className="list-none">
          <a href="https://www.instagram.com/vapezonekenya/" target="_blank" rel="noreferrer" className="hover:text-ui-fg-base transition-colors">
            <FaInstagram className="hover:text-pink-500" />
          </a>
        </li>
        <li className="list-none">
          <a href="https://www.facebook.com/profile.php?id=61579752452893" target="_blank" rel="noreferrer" className="hover:text-ui-fg-base transition-colors">
            <FaFacebook className="hover:text-blue-600" />
          </a>
        </li>
        <li className="list-none">
          <a href="mailto:vapezonekenya@gmail.com" target="_blank" rel="noreferrer" className="hover:text-ui-fg-base transition-colors">
            <FaEnvelope className="hover:text-red-500" />
          </a>
        </li>
        <li className="list-none">
          <a href="https://tiktok.com/@vapezonekenya" target="_blank" rel="noreferrer" className="hover:text-ui-fg-base transition-colors">
            <FaTiktok className="hover:text-red-500" />
          </a>
        </li>
    </div>
  )
}

export default MedusaCTA
