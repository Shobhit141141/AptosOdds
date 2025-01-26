import React, { useState } from "react";
import {
  FaWhatsapp,
  FaFacebookMessenger,
  FaTwitter,
  FaLinkedin,
  FaRegClipboard,
  FaClipboardCheck,
  FaShare,
} from "react-icons/fa";

const ShareButton = ({ text = "hello", memeUrl }) => {
  const [shareNow, setShareNow] = useState(false);
  const message = encodeURIComponent(`${text} ${memeUrl}`);

  // Social media share handlers
  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const handleMessengerShare = () => {
    window.open(
      `fb-messenger://share/?link=${encodeURIComponent(
        memeUrl
      )}&app_id=YOUR_APP_ID`,
      "_blank"
    );
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
  };

  const handleLinkedInShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        memeUrl
      )}`,
      "_blank"
    );
  };

  // Clipboard functionality
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(memeUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="relative">
      {/* Main Share Button */}
      <button
        className=""
        onClick={() => setShareNow(!shareNow)}
      >
       <div className="flex flex-col items-center">
          <button className="p-2 rounded-full text-white bg-gray-800 hover:bg-gray-700">
            <FaShare size={24} />
          </button>
        </div>
      </button>

      {/* Share Options Section */}
      {shareNow && (
        <section className="my-2 absolute left-[100%] bottom-4 z-10 w-80">
          <div className="flex flex-col items-center justify-center bg-gray-100 py-2 ">
            <h1 className="text-2xl font-bold mb-4">Share this content</h1>
            <div className="flex space-x-4 py-3">
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center justify-center p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
              >
                <FaWhatsapp size={24} />
              </button>
              <button
                onClick={handleMessengerShare}
                className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <FaFacebookMessenger size={24} />
              </button>
              <button
                onClick={handleTwitterShare}
                className="flex items-center justify-center p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500"
              >
                <FaTwitter size={24} />
              </button>
              <button
                onClick={handleLinkedInShare}
                className="flex items-center justify-center p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800"
              >
                <FaLinkedin size={24} />
              </button>
            </div>
          </div>

          {/* Copy URL Section */}
          <div className="flex flex-col items-center justify-center bg-gray-100 mb-2 py-2">
            <h1 className="text-xl font-bold mb-4">Copy this URL</h1>
            <div className="flex items-center justify-center">
              <button
                onClick={handleCopy}
                className={`flex items-center justify-center p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ${
                  copied ? "bg-green-600 hover:bg-green-700" : ""
                }`}
              >
                {copied ? (
                  <FaClipboardCheck size={24} />
                ) : (
                  <FaRegClipboard size={16} />
                )}
                <span className="ml-2">{copied ? "Copied!" : "Copy URL"}</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ShareButton;
