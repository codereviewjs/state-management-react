import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Categories, IReport } from "types";
import { Button, Dropdown, Input, Label, Layout, Textarea } from "ui";
import { reportsApi } from "../../api";
import { routes } from "../../constants/routes.constants";
import { useStoreContext } from "../../context/store/Store.context";
import { routeUtils } from "../../utils/route.utils";
import styles from "./Report.module.css";

const ReportEdit = () => {
  const { reports, updateReport } = useStoreContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const originalReport = reports.data.find((report) => report._id === id);
  const [report, setReport] = useState<IReport>({
    ...originalReport,
  } as IReport);

  if (!id || !report || !originalReport) {
    return <div>Report not found</div>;
  }

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

  const isReportChanged =
    originalReport.title !== report.title ||
    originalReport.description !== report.description ||
    originalReport.category !== report.category;

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!report?._id || !isReportChanged) return;

    await updateReport(report._id, report);
    navigate(routeUtils.replaceIdParamWithValue(routes.reports.report, id));
  };

  return (
    <Layout
      className={styles.container}
      title={`Edit report ${originalReport.title}`}
    >
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
          <Button size='large' disabled={!isReportChanged}>
            Save
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
