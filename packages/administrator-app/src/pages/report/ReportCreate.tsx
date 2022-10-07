import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Categories, ICreateReport } from "types";
import { Button, Dropdown, Input, Label, Layout, Textarea } from "ui";
import { useStoreContext } from "../../context/store/Store.context";
import { routesWithParams } from "../../utils/route.utils";
import styles from "./Report.module.css";

const ReportEdit = () => {
  const { createReport } = useStoreContext();
  const navigate = useNavigate();
  const [report, setReport] = useState<ICreateReport>({
    category: Categories.FOOD,
    description: "",
    title: "",
  } as ICreateReport);

  const handleCategoryChange = (category: Categories) => {
    setReport((prev) => ({
      ...prev,
      category: category,
    }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReport((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReport((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const isValidReport = report.title && report.description;

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidReport) return;

    const reportResponse = await createReport(report);

    if (reportResponse._id) {
      navigate(routesWithParams.reports.report(reportResponse._id));
    }
  };

  return (
    <Layout className={styles.container} title='Report Creation'>
      <form onSubmit={handleSubmit} className={styles.body}>
        <div className={styles.formInputsContainer}>
          <Label label='Category'>
            <Dropdown
              value={report.category}
              onChange={(e) =>
                handleCategoryChange(e.target.value as Categories)
              }
              options={Object.values(Categories).map((category) => ({
                value: category,
                content: category.toLowerCase(),
              }))}
            />
          </Label>
          <Label label='Title'>
            <Input value={report.title} onChange={handleTitleChange} />
          </Label>
          <Label label='Description'>
            <Textarea
              value={report.description}
              onChange={handleDescriptionChange}
              rows={25}
            />
          </Label>
        </div>
        <div className={styles.buttonsContainer}>
          <Button size='large' disabled={!isValidReport}>
            Create
          </Button>

          <Button
            type='button'
            onClick={() => navigate(-1)}
            size='large'
            outline
          >
            Back
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default ReportEdit;
