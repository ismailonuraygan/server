import { AppShell, Header, Navbar, Box, Anchor } from "@mantine/core";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useMe } from "../context/me";

function HomePageLayout({ children }: { children: React.ReactNode }) {
  const { user, refetch } = useMe();
  console.log(user);
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          Side items
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Box sx={() => ({ display: "flex" })}>
            <Box sx={() => ({ flex: "1" })}> 
              <Image src="/logo.png" alt="logo" width={100} height={40} />
            </Box>
            {!user && (
              <>
                <Link href="/auth/login" passHref>
                  <Anchor ml="lg" mr="lr">
                    Login
                  </Anchor>
                </Link>
                <Link href="/auth/register" passHref>
                  <Anchor ml="lg" mr="lr">
                    Register
                  </Anchor>
                </Link>
              </>
            )}
            {user && <p>Upload Video</p>}
          </Box>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}

export default HomePageLayout;
