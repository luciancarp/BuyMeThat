package com.buymethat.server.controllers;

import com.buymethat.server.services.ExampleService;
import com.buymethat.db.tables.pojos.ExampleTable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ExampleController {
  private final ExampleService exampleService;

  public ExampleController(ExampleService exampleService) {
    this.exampleService = exampleService;
  }

  @RequestMapping("/example")
  public @ResponseBody
  List<ExampleTable> getMattOnly() {
    return exampleService.getName("Matt");
  }
}
