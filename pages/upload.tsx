import {
  Flex,
  FormControl,
  useColorModeValue,
  FormLabel,
  Heading,
  Input,
  Stack,
  Button,
  Textarea,
  InputGroup,
  InputRightElement,
  IconButton,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  useToast,
  Text,
} from "@chakra-ui/react";
import { KeyboardEvent, useEffect, useState } from "react";
import { supabase } from "@utils/supabase";
import { v4 as uuidv4 } from "uuid";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { definitions } from "../types/supabase";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [currTag, setCurrTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFileAllowed, setIsFileAllowed] = useState(false);

  useEffect(() => {
    const regex = new RegExp(/^.*\/(mp3|ogg|wav|x-m4a|flac|mpeg)$/i);
    if (file) setIsFileAllowed(regex.test(file?.type));
  }, [file]);

  const toast = useToast();
  const router = useRouter();
  const currentUser = supabase.auth.user();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter" || event.code === "Space") {
      handleAddTag();
    }
  };

  const handleAddTag = () => {
    if (currTag.length > 12) {
      toast({
        title: "Tag too long!",
        description: "Max length is 12 characters",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (currTag.length > 2) {
      setTags([...tags, currTag.trim()]);
      setCurrTag("");
    }
  };

  const handleRemoveTag = (tagIndex: number) => {
    setTags([...tags.filter((tag, index) => index !== tagIndex)]);
  };

  const handleUpload = async () => {
    if (title && file && currentUser) {
      setLoading(true);
      const id = uuidv4();

      const { data: fileUploadData, error: fileUploadError } =
        await supabase.storage.from("filer").upload(id, file);

      if (fileUploadData) {
        const { data: postData, error: postError } = await supabase
          .from<definitions["post"]>("post")
          .insert({
            title,
            description,
            file_id: id,
            tags,
            created_by: currentUser?.id,
          });

        if (postData) {
          setLoading(false);
          toast({
            title: "Post created successfully!",
            description: "Beautiful 😊",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          router.push("/"); // TODO: Routa till post när jag satt upp komponenten
        }

        if (postError || fileUploadError) {
          setLoading(false);
          toast({
            title: "Something went wrong",
            description: "Please try again...",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    }
  };

  return (
    <Flex justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white.50", "gray.700")}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Upload something nice 😊
        </Heading>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input type="text" onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Audio file</FormLabel>
          <Text color={useColorModeValue("gray.700", "gray.400")} pb="1">
            (supported file types: mp3, ogg, wav, x-m4a, flac)
          </Text>
          <Input
            accept="audio/*"
            type="file"
            onChange={(e) => {
              e.target.files !== null && setFile(e.target.files[0]);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Tags</FormLabel>
          <InputGroup>
            <Input
              type="text"
              value={currTag}
              onChange={(e) => setCurrTag(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <InputRightElement>
              <IconButton
                aria-label="Add tag"
                size="sm"
                onClick={handleAddTag}
                icon={<AddIcon />}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Wrap>
          {tags.map((t, i) => (
            <WrapItem key={i}>
              <Tag>
                <TagLabel> {t} </TagLabel>
                <TagCloseButton onClick={() => handleRemoveTag(i)} />
              </Tag>
            </WrapItem>
          ))}
        </Wrap>

        <Button
          onClick={handleUpload}
          disabled={
            !title || !file || !description || loading || !isFileAllowed
          }
          isLoading={loading}
          loadingText="Uploading..."
          colorScheme="green"
        >
          Upload
        </Button>
      </Stack>
    </Flex>
  );
}
