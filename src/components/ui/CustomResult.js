import React from "react";
import {
  Heading,
  Text,
  Card,
  DataList,
  Badge,
  Flex,
  Box,
  Strong,
  Separator,
  Container,
  Button,
  Link,
  Callout,
} from "@radix-ui/themes";
// import { CircleAlert } from "@lucide/react";

const CustomResultView = (props) => {
  // console.log("Editable Items", props.result);

  const isAbstract =
    props.result.abstract.raw &&
    props.result.abstract.raw !== "" &&
    props.result.abstract.raw !== "Not provided"
      ? true
      : false;

  const isFile = props.result.file.raw ? true : false;

  const handleButtonClick = () => {
    window.open(props.result.file.raw, props.result.file.raw);
  };

  return (
    <Card mb={"3"} variant="surface">
      <Box p={"3"}>
        {/* Document and Paper Type */}
        <Flex gapX={"3"} wrap={"wrap"} mb={"1"}>
          <Badge size="2" color="violet">
            {props.result.paper_type.snippet}
          </Badge>

          <Badge size="2" color="teal">
            {props.result.document_type.snippet}
          </Badge>
        </Flex>

        {/* Title */}
        <Heading as="h2" className=" mb-[15px]">
          {props.result.title.raw}
        </Heading>

        {/* Authors */}
        <DataList.Root mb={"4"}>
          <DataList.Item align="start">
            <DataList.Label minWidth="105px">Author</DataList.Label>
            <DataList.Value>
              <Flex gapX={"2"} wrap={"wrap"}>
                {props.result.authors.raw.map((name) => {
                  return (
                    <Card key={name}>
                      <Text as="p" size={"2"} weight={"medium"}>
                        {name}
                      </Text>
                    </Card>
                  );
                })}
              </Flex>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>

        {/* Research Topic */}
        <DataList.Root mb={"2"}>
          <DataList.Item align="start">
            <DataList.Label minWidth="105px">Research Topic</DataList.Label>
            <DataList.Value>
              <Text as="p" size={"2"} weight={"regular"}>
                <Strong>{props.result.research_topic.snippet}</Strong>
              </Text>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>

        {/* Source Origin */}
        <DataList.Root mb={"2"}>
          <DataList.Item align="start">
            <DataList.Label minWidth="105px">Source</DataList.Label>
            <DataList.Value>
              <Text as="p" size={"2"} weight={"regular"}>
                {props.result.source_of_origin.snippet}
              </Text>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>

        {/* Publisher */}
        <DataList.Root mb={"2"}>
          <DataList.Item align="start">
            <DataList.Label minWidth="105px">Publisher</DataList.Label>
            <DataList.Value>
              <Text as="p" size={"2"} weight={"regular"}>
                {props.result.publisher.snippet}
              </Text>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>

        {/* Publication Date */}
        <DataList.Root mb={"2"}>
          <DataList.Item align="start">
            <DataList.Label minWidth="105px">Publication Year</DataList.Label>
            <DataList.Value>
              <Text as="p" size={"2"} weight={"regular"}>
                {props.result.publication_date.snippet}
              </Text>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>

        {/* Language */}
        <DataList.Root mb={"4"}>
          <DataList.Item align="start">
            <DataList.Label minWidth="105px">Language</DataList.Label>
            <DataList.Value>
              <Text>{props.result.language.snippet}</Text>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>

        {/* Abstract */}
        {!isFile && !isAbstract ? (
          <Callout.Root>
            <Callout.Icon></Callout.Icon>
            <Callout.Text>No abstract and source file attach.</Callout.Text>
          </Callout.Root>
        ) : isFile && !isAbstract ? (
          <>
            <Callout.Root className="mb-4">
              <Callout.Icon></Callout.Icon>
              <Callout.Text>No abstract provided.</Callout.Text>
            </Callout.Root>
            <Button size={"2"} onClick={handleButtonClick}>
              View source file
            </Button>
          </>
        ) : !isFile && isAbstract ? (
          <>
            <Card className="border-l-[5px] border-l-[#bd224e] mb-4">
              <Box pl={"3"}>
                <Heading as="h5" size={"3"} mb={"1"}>
                  Abstract
                </Heading>
                <Text as="p" size={"2"}>
                  {props.result.abstract.snippet}
                </Text>
              </Box>
            </Card>
            <Callout.Root>
              <Callout.Icon></Callout.Icon>
              <Callout.Text>No source file attach.</Callout.Text>
            </Callout.Root>
          </>
        ) : (
          <>
            <Card className="border-l-[5px] border-l-[#bd224e] mb-4">
              <Box pl={"3"}>
                <Heading as="h5" size={"3"} mb={"1"}>
                  Abstract
                </Heading>
                <Text as="p" size={"2"}>
                  {props.result.abstract.snippet}
                </Text>
              </Box>
            </Card>
            <Button size={"2"} onClick={handleButtonClick}>
              View source file
            </Button>
          </>
        )}
      </Box>
    </Card>
  );
};

export default CustomResultView;
