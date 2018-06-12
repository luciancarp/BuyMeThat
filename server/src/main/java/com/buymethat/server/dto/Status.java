package com.buymethat.server.dto;

public class Status {
  String status;
  String version;

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getVersion() {
    return version;
  }

  public void setVersion(String version) {
    this.version = version;
  }

  public Status(String status, String version) {
    this.status = status;
    this.version = version;
  }
}
