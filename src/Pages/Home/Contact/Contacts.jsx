import React from "react";
import { useMantineTheme, ActionIcon } from "@mantine/core";
import { FaWhatsapp, FaTelegram, FaPhone, FaEnvelope } from "react-icons/fa";

const Contacts = () => {
  const handleWhatsAppClick = () => {
    // Handle WhatsApp click
  };

  const handleTelegramClick = () => {
    // Handle Telegram click
  };

  const theme = useMantineTheme();

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <ActionIcon
          component="a"
          href={`https://wa.me/9119068159`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme.colors.green[9], marginRight: 12, marginBottom: 5, marginTop: 30 }}
          onClick={handleWhatsAppClick}
        >
          <FaWhatsapp size={120}/>
        </ActionIcon>
        <ActionIcon
          component="a"
          href={`tel:+9119068159`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme.colors.red[9], marginRight: 12, marginBottom: 5, marginTop: 30 }}
        >
          <FaPhone size={120} />
        </ActionIcon>
        <ActionIcon
          component="a"
          href={`mailto:info@example.com`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme.colors.blue[9], marginRight: 12, marginBottom: 5, marginTop: 30 }}
        >
          <FaEnvelope size={120} />
        </ActionIcon>
        <ActionIcon
          component="a"
          href={`https://t.me/coprum`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme.colors.blue[9], marginBottom: 12, marginBottom: 5, marginTop: 30}}
          onClick={handleTelegramClick}
        >
          <FaTelegram size={120} />
        </ActionIcon>
      </div>
    </>
  );
};

export default Contacts;
