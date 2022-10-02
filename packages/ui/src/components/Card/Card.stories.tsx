import { ComponentMeta } from "@storybook/react";
import Card from "./Card";

export default {
  title: "Card",
  component: Card,
} as ComponentMeta<typeof Card>;

export const Basic = () => {
  return (
    <Card>
      <Card.Header>
        Dolore eiusmod sunt duis est commodo sit deserunt eu sunt.
      </Card.Header>
      <Card.Content>
        Amet sunt reprehenderit duis aliquip dolore consequat ea sint ullamco
        sit. Pariatur commodo nulla ad mollit incididunt tempor elit pariatur id
        non ea. Non eu adipisicing reprehenderit in eu dolore sit pariatur
        cillum nostrud consectetur tempor voluptate. Ut nulla irure non
        cupidatat ut aliqua officia.
      </Card.Content>
      <Card.Footer style={{ justifyContent: "space-between" }}>
        <div>Something about this</div>
        <Card.ActionButtons
          primaryButtonProps={{ content: "Save" }}
          secondaryButtonProps={{ content: "Delete" }}
        />
      </Card.Footer>
    </Card>
  );
};
