import { useEffect, useRef, useState } from "react";
import NotificationSound from "../assets/audio/Short-notification-sound.mp3";
import { io, Socket } from "socket.io-client";

export const useOrderNotification = () => {
  const [newNotification, setNewNotification] = useState(false);
  const audioRef = useRef(new Audio(NotificationSound));
  const socketRef = useRef<Socket | null>(null);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  useEffect(() => {
    const unlockAudio = () => {
      audioRef.current
        .play()
        .then(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setAudioUnlocked(true);
        })
        .catch(() => setAudioUnlocked(false));

      window.removeEventListener("click", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    return () => window.removeEventListener("click", unlockAudio);
  }, []);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, [Notification.permission !== "granted"]);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_API_URL);

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const playSound = () => {
    if (!audioUnlocked) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  useEffect(() => {
    if (!socketRef.current) return;

    let lastOrderTime = 0;

    const handleNewOrder = (orderData: any) => {
      if (!orderData) return;

      const now = Date.now();
      if (now - lastOrderTime < 2000) return;
      lastOrderTime = now;

      setNewNotification(true);

      playSound();

      if (Notification.permission === "granted") {
        new Notification("New Order", {
          body: "A customer just placed an order!",
        });
      }

      setTimeout(() => setNewNotification(false), 1000);
    };

    socketRef.current.on("new-order", handleNewOrder);

    return () => {
      socketRef.current?.off("new-order", handleNewOrder);
    };
  }, [audioUnlocked]);

  return { newNotification };
};
