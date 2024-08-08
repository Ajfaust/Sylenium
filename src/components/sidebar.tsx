import { useSuspenseQuery } from "@tanstack/react-query";
import { SidebarItem } from "../types";
import { allAccountsQueryOptions } from "../utils/accounts-helper";
import { Collection, Header, ListBox, ListBoxItem, Section } from "react-aria-components";

interface SidebarProps {
    sidebarItems: Array<SidebarItem>;
}

function AccountAccordion() {
    const { data: accounts } = useSuspenseQuery(allAccountsQueryOptions);

    return (
        <ListBox aria-label="Accounts" selectionMode="single" items={accounts}>
            <Section id="accounts">
                <Header>Accounts</Header>
                <Collection items={accounts}>
                    {account => <ListBoxItem id={account.accountId} href={`/accounts/${account.accountId}`}>{account.name}</ListBoxItem>}
                </Collection>
            </Section>
        </ListBox>
    )
}