import {
  Flex,
  IconButton,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsRecordCircleFill, BsStopFill } from "react-icons/bs";

export default function Record(): JSX.Element {
  const [isRecording, setIsRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (isRecording) {
      timer = setInterval(() => setRecordTimer(recordTimer + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording, recordTimer]);

  const handleStartRecording = () => {
    setIsRecording(!isRecording);
    if (audioPlayerRef.current) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(handleSuccessfulRecording);
    }
  };

  const handleSuccessfulRecording = (stream: MediaStream) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.srcObject = stream;
    }
  };

  return (
    <Flex justify={"center"}>
      <audio id="player" controls ref={audioPlayerRef} hidden />
      <p> {isRecording ? "Spelar in" : "Spelar inte in"} </p>
      <p> {recordTimer} </p>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("gray.50", "gray.700")}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        p={6}
        position={"fixed"}
        bottom={0}
        alignItems={"center"}
      >
        <IconButton
          aria-label="Record"
          icon={isRecording ? <BsStopFill size="xxl" /> : <BsRecordCircleFill size="xxl" />}
          color="red"
          size="lg"
          rounded="3xl"
          onClick={handleStartRecording}
          w="1"
          bg="transparent"
        />
        <Input type="file" accept="audio/*" capture hidden />
      </Stack>
    </Flex>
  );
}
