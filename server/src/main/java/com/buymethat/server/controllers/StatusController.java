package com.buymethat.server.controllers;

import com.buymethat.server.dto.Status;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {
  @RequestMapping("/status")
  public @ResponseBody
  Status getStatus() {
    return new Status("0.0.1", "Okay");
  }
}
