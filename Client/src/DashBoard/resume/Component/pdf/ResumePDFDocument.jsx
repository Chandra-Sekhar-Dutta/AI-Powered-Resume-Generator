import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const ResumePDFDocument = ({ resumeInfo }) => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#FFFFFF",
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 32,
      paddingRight: 32,
      fontSize: 11,
      fontFamily: "Helvetica",
      lineHeight: 1.4,
    },

    header: {
      textAlign: "center",
      marginBottom: 4,
    },

    name: {
      fontSize: 18,
      fontWeight: "bold",
    },

    jobTitle: {
      marginTop: 5,
      fontSize: 12,
      fontWeight: "500",
      color: "#4B5563",
    },

    address: {
      fontSize: 10,
      color: "#6B7280",
    },

    contact: {
      flexDirection: "row",
      justifyContent: "center",
      fontSize: 10,
      color: "#4B5563",
      marginTop: 4,
    },
    contactItem: {
      marginHorizontal: 6,
    },

    divider: {
      borderBottomWidth: 1.5,
      borderColor: resumeInfo?.themeColor || "#000",
      marginVertical: 6,
    },

    section: {
      paddingTop: 4,
      paddingBottom: 4,
      marginBottom: 6,
    },

    heading: {
      fontSize: 12,
      fontWeight: "600",
      color: resumeInfo?.themeColor || "#1F2937",
      textAlign: "left",
      marginBottom: 2,
    },

    text: {
      fontSize: 10,
      color: "#374151",
      lineHeight: 1.3,
      textAlign: "justify",
    },

    educationItem: {
      marginBottom: 6,
    },

    university: {
      fontSize: 11,
      fontWeight: "600",
      color: "#1F2937",
    },

    eduRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 10,
      color: "#374151",
    },

    experience: {
      marginBottom: 8,
    },

    expTitle: {
      fontSize: 11,
      fontWeight: "600",
      color: "#1F2937",
    },

    expRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 10,
      color: "#4B5563",
      fontStyle: "italic",
    },

    expDate: {
      fontStyle: "normal",
      color: "#6B7280",
    },

    expText: {
      fontSize: 10,
      color: "#374151",
      marginTop: 3,
      lineHeight: 1.3,
      textAlign: "justify",
    },

    skillGrid: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
    },
    skillItem: {
      width: "48%",
      marginBottom: 4,
    },
    skillCategory: {
      fontWeight: "bold",
      fontSize: 10.5,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {resumeInfo?.firstName} {resumeInfo?.lastName}
          </Text>
          <Text style={styles.jobTitle}>{resumeInfo?.jobTitle}</Text>
          <Text style={styles.address}>{resumeInfo?.address}</Text>

          <View style={styles.contact}>
            <Text style={styles.contactItem}>{resumeInfo?.phone}</Text>
            <Text style={styles.contactItem}>{resumeInfo?.email}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.heading}>Summary</Text>
          <Text style={styles.text}>{resumeInfo?.summery}</Text>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>
          <View style={styles.divider} />
          {resumeInfo?.education?.map((edu, idx) => (
            <View key={idx} style={styles.educationItem}>
              <Text style={styles.university}>{edu?.universityName}</Text>
              <View style={styles.eduRow}>
                <Text>
                  {edu?.degree} in {edu?.major}
                </Text>
                <Text>
                  {edu?.startDate} - {edu?.endDate}
                </Text>
              </View>
              <Text style={styles.text}>{edu?.description}</Text>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.heading}>Skills</Text>
          <View style={styles.divider} />
          <View style={styles.skillGrid}>
            {resumeInfo?.skills?.map((skill, idx) => (
              <View key={idx} style={styles.skillItem}>
                <Text
                  style={[
                    styles.skillCategory,
                    { color: resumeInfo?.themeColor },
                  ]}
                >
                  {skill?.category}
                </Text>
                <Text style={styles.text}>{skill?.items.join(", ")}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Professional Experience */}
        <View style={styles.section}>
          <Text style={styles.heading}>Professional Experience</Text>
          <View style={styles.divider} />
          {resumeInfo?.experience?.map((exp, idx) => (
            <View key={idx} style={styles.experience}>
              <Text style={styles.expTitle}>{exp?.title}</Text>
              <View style={styles.expRow}>
                <Text>
                  {exp?.companyName}, {exp?.city}, {exp?.state}
                </Text>
                <Text style={styles.expDate}>
                  {exp?.startDate} -{" "}
                  {exp?.currentlyWorking ? "Present" : exp?.endDate}
                </Text>
              </View>
              <Text style={styles.expText}>{exp?.workSummery}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDFDocument;
