import { Box, Flex, Text } from "@chakra-ui/layout";
import { SkeletonText, Image } from "@chakra-ui/react";
import React from "react";

export const GradientLayout = ({
  color,
  children,
  title,
  image,
  subtitle,
  desc,
  roundImage,
  isLoaded,
}: {
  color: string;
  children: React.ReactNode;
  title: string;
  image: string;
  subtitle: string;
  desc: string;
  roundImage: boolean;
  isLoaded: boolean;
}) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(2,2,2,.95) 75%)`}
    >
      <Flex
        bgGradient={`linear(${color}.400 0%, ${color}.500 15%, ${color}.600 40%, rgba(2,2,2,.1) 95%)`}
        padding="40px"
        align="end"
      >
        <Box padding="20px">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? "100%" : "3px"}
          />
        </Box>

        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <SkeletonText isLoaded={isLoaded}>
            <Text fontSize="6xl" fontWeight="bold">
              {title}
            </Text>
          </SkeletonText>
          <Text fontSize="sm" fontWeight="100">
            {desc}
          </Text>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  );
};
