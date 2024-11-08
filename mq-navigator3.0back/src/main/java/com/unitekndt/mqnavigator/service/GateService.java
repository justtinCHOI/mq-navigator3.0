package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.dto.IGate;
import java.util.List;

public interface GateService {
    List<IGate> getGatesByWorkspaceUrl(String token, String workspaceUrl);
    List<IGate> updateGatesByWorkspaceUrl(String token, String workspaceUrl, List<IGate> gates);
}
