import { Container, Tab, TabList, Tabs } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export function LayoutTabs({ children, tabs }) {
  const router = useRouter();
  const { asPath } = router;

  const indexActive = tabs.findIndex((tab) => tab.route === asPath);

  return (
    <Container maxW="container.lg">
      <Tabs isLazy index={indexActive}>
        <TabList bgColor="white" borderTopRadius="md">
          {tabs.map((tab, index) => (
            <Link href={tab.route} key={index}>
              <Tab
                _selected={{ color: "brand.primary", borderBottom: "2px" }}
                fontWeight="medium"
              >
                {tab.name}
              </Tab>
            </Link>
          ))}
        </TabList>
      </Tabs>
      {children}
    </Container>
  );
}
