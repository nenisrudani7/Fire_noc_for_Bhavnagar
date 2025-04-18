import React, { useState } from "react";
import axios from "axios";
import "../Assets/css/Userstyle.css";

export const RenewApplicationDetails = () => {
  const [applicationId, setApplicationId] = useState("");
  const [applicationData, setApplicationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    personalInfo: {},
    locationInfo: {},
    architectInfo: {},
  });

  const fetchApplicationData = async () => {
    if (!applicationId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/applications/for-renewal/${applicationId}`
      );

      if (response.data.success) {
        setApplicationData(response.data.data);

        // Pre-fill form data
        setFormData({
          personalInfo: {
            name: response.data.data.application.name || "",
            mobile: response.data.data.application.mobile_number || "",
            email: response.data.data.application.email || "",
          },
          locationInfo: {
            district: response.data.data.location?.district || "",
            plot_details: response.data.data.location?.plot_details || "",
            area: response.data.data.location?.area || "",
            landmark: response.data.data.location?.landmark || "",
            taluka: response.data.data.location?.taluka || "",
            pin_code: response.data.data.location?.pin_code || "",
          },
          architectInfo: {
            architectName: response.data.data.architect?.name || "",
            registration_no:
              response.data.data.architect?.registration_no || "",
          },
        });
      } else {
        setError(response.data.message || "Failed to fetch application data");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch application data"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // For submitting renewal
      const response = await axios.post(
        "http://localhost:5000/api/applications/renew",
        {
          originalApplicationId: applicationId,
          ...formData,
        }
      );

      if (response.data.success) {
        alert("Renewal application submitted successfully!");
        // Optionally reset form or redirect
      } else {
        setError(response.data.message || "Failed to submit renewal");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to submit renewal"
      );
    }
  };

  return (
    <div>
      <div className="mb-4 p-3 border rounded">
        <h4 className="mb-3">Renew NOC Application</h4>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <label htmlFor="applicationId">
                Enter Original Application ID*
              </label>
              <input
                type="text"
                className="form-control"
                id="applicationId"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-end">
            <button
              className="btn btn-primary"
              onClick={fetchApplicationData}
              disabled={!applicationId || loading}
            >
              {loading ? "Loading..." : "Fetch Details"}
            </button>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      {applicationData && (
        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="section-container position-relative mb-4">
            <div
              className="section-header position-absolute bg-white px-3 py-1 rounded"
              style={{ top: "-15px", left: "20px", zIndex: 1 }}
            >
              <h5 className="mb-0" style={{ color: "#582105" }}>
                Personal Information
              </h5>
            </div>

            <div
              className="section-content bg-light p-4 border-2 rounded-3"
              style={{ border: "2px solid #582105", paddingTop: "30px" }}
            >
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={formData.personalInfo.name}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "name",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">
                      Mobile Number*
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="mobile"
                      value={formData.personalInfo.mobile}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "mobile",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email ID*
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={formData.personalInfo.email}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "email",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Information Section */}
          <div className="section-container position-relative mb-4">
            <div
              className="section-header position-absolute bg-white px-3 py-1 rounded"
              style={{ top: "-15px", left: "20px", zIndex: 1 }}
            >
              <h5 className="mb-0" style={{ color: "#582105" }}>
                Location Information
              </h5>
            </div>

            <div
              className="section-content bg-light p-4 border-2 rounded-3"
              style={{ border: "2px solid #582105", paddingTop: "30px" }}
            >
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="district" className="form-label">
                      District*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="district"
                      value={formData.locationInfo.district}
                      onChange={(e) =>
                        handleInputChange(
                          "locationInfo",
                          "district",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="plot" className="form-label">
                      Plot/ House No., Building/ Company/ Apartment Name/ No.*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="plot"
                      value={formData.locationInfo.plot_details}
                      onChange={(e) =>
                        handleInputChange(
                          "locationInfo",
                          "plot",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="area" className="form-label">
                      Area/ Colony/ Street/ Sector/ Ward/ Village*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="area"
                      value={formData.locationInfo.area}
                      onChange={(e) =>
                        handleInputChange(
                          "locationInfo",
                          "area",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="landmark" className="form-label">
                      Landmark*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="landmark"
                      value={formData.locationInfo.landmark}
                      onChange={(e) =>
                        handleInputChange(
                          "locationInfo",
                          "landmark",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="taluka" className="form-label">
                      Taluka*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="taluka"
                      value={formData.locationInfo.taluka}
                      onChange={(e) =>
                        handleInputChange(
                          "locationInfo",
                          "taluka",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="pin_code" className="form-label">
                      Pin Code*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="pin_code"
                      value={formData.locationInfo.pin_code}
                      onChange={(e) =>
                        handleInputChange(
                          "locationInfo",
                          "pin_code",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Architect/Engineer Details Section */}
          <div className="section-container position-relative mb-4">
            <div
              className="section-header position-absolute bg-white px-3 py-1 rounded"
              style={{ top: "-15px", left: "20px", zIndex: 1 }}
            >
              <h5 className="mb-0" style={{ color: "#582105" }}>
                Architect/Engineer Details
              </h5>
            </div>

            <div
              className="section-content bg-light p-4 border-2 rounded-3"
              style={{ border: "2px solid #582105", paddingTop: "30px" }}
            >
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="architectName" className="form-label">
                      Name (Architect on Record - AoR / Engineer on Record -
                      EoR)*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="architectName"
                      value={formData.architectInfo.architectName}
                      onChange={(e) =>
                        handleInputChange(
                          "architectInfo",
                          "architectName",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="registration_no" className="form-label">
                      Registration No.*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="registration_no"
                      value={formData.architectInfo.registration_no}
                      onChange={(e) =>
                        handleInputChange(
                          "architectInfo",
                          "registration_no",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary btn-lg">
              Submit Renewal Application
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RenewApplicationDetails;
