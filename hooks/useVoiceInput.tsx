import { useState, useEffect } from "react";
import Voice from "@react-native-voice/voice";

// Custom Hook for voice input
const useVoiceInput = () => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recognizedText, setRecognizedText] = useState<string>("");

  // Start voice listening
  const startListening = async () => {
    try {
      await Voice.start("en-US");
      setIsListening(true);
      setError(null); // Reset any previous errors
    } catch (err) {
      setError("Error starting voice recognition");
      console.error(err);
    }
  };

  // Stop voice listening
  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (err) {
      setError("Error stopping voice recognition");
      console.error(err);
    }
  };

  // Set up voice event listeners
  useEffect(() => {
    Voice.onSpeechResults = (event) => {
      if (event.value && event.value.length > 0) {
        setRecognizedText(event.value[0]);
      }
    };

    Voice.onSpeechError = (event) => {
      setError(event.error?.message || "Unknown error");
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return { isListening, error, startListening, stopListening, recognizedText };
};

export default useVoiceInput;
